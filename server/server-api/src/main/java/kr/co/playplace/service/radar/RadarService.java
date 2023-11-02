package kr.co.playplace.service.radar;

import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.location.UserLocationRepository;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.*;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.redis.connection.RedisGeoCommands.*;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class RadarService {

    private final UserRepository userRepository;
    private final UserLocationRepository userLocationRepository;

    private final RedisTemplate redisTemplate;

    public void saveUserLocation(long userId, UserLocationRequest userLocationRequest) {
//        UserLocation userLocation = UserLocation.builder()
//                .id(userId)
//                .longitude(userLocationRequest.getLongitude())
//                .latitude(userLocationRequest.getLatitude())
//                .songId(1L)
//                .build();

//        userLocationRepository.save(userLocation);

//        log.debug("latitude: {}",userLocationRepository.findById(userId).map(UserLocation::getLatitude).orElse(0.0));

//        String key = GeoHash.withCharacterPrecision(userLocationRequest.getLatitude(), userLocationRequest.getLongitude(), 7).toBase32();

        // redis geo 자료구조 설정
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();

        String key = "geoPoints";
        Point point = new Point(userLocationRequest.getLongitude(), userLocationRequest.getLatitude());

        // TODO: 만료 시간 지정
        // redis에 geohash 별로 저장
        geoOperations.add(key, point, "" + userId);

        log.debug("geoHash: {}", geoOperations.hash(key,"" + userId));
    }

    public void updateUserLocationState(long userId) {

        String key = "geoPoints:" +  userId;
        redisTemplate.delete(key);
    }

}
