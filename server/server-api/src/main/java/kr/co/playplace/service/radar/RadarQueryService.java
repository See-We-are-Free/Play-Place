package kr.co.playplace.service.radar;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.song.SongQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RadarQueryService {

    private final SongQueryService songQueryService;

    private final UserRepository userRepository;
    private final SongRepository songRepository;

    private final RedisTemplate redisTemplate;

    public List<UsersNearbyResponse> findNearbyUsers(long userId) {

//        GeoHash geoHash = GeoHash.withCharacterPrecision(latitude, longitude, 7);
//        GeoHash[] adjHash = geoHash.getAdjacent();
//        log.debug("location : {}", geoHash.toBase32());
//        for(GeoHash adj : adjHash) {
//            log.debug("adjLocation : {}",adj.toBase32());
//        }

        // TODO: 사용자의 레이더 설정이 꺼져 있다면 에러 처리
        Users user = userRepository.findById(userId).get();
        if(user.getIsRadar() == 1) {
            throw new BaseException(ErrorCode.INVALID_USE_RADAR);
        }

        // 사용자 위치 redis에서 조회
        Point userLocation = findUserLocation(userId);

        // 사용자의 위치를 중심으로 반경 100m 범위 설정
        Distance radius = new Distance(100, RedisGeoCommands.DistanceUnit.METERS);
        Circle circle = new Circle(userLocation, radius);

        // redis geo 자료구조 설정
        GeoOperations<String, String> geoOperations = redisTemplate.opsForGeo();

        // redis geo 명령어 옵션 설정, limit 30
        RedisGeoCommands.GeoRadiusCommandArgs args = RedisGeoCommands.GeoRadiusCommandArgs
                .newGeoRadiusArgs()
                .includeDistance()
                .includeCoordinates()
                .sortAscending()
                .limit(13);

        // 설정한 위치 범위 안에 있는 사용자들 검색
        GeoResults<RedisGeoCommands.GeoLocation<String>> results = geoOperations
                .radius("geoPoints", circle, args);

        List<UsersNearbyResponse> list = new ArrayList<>();

        // 범위 안에 있는 사용자에 대해 최근 재생 곡 조회
        for(GeoResult<RedisGeoCommands.GeoLocation<String>> result : results) {
            RedisGeoCommands.GeoLocation<String> location = result.getContent();

            Long userNearbyId = Long.parseLong(location.getName());

            // 본인은 제외
            if(userNearbyId == userId) {
                continue;
            }

            log.debug("userNearby:{}", userNearbyId);

            // 중심 좌표로부터의 거리를 기준으로 level 지정
            log.debug("distance: {}", result.getDistance());

            double distance = result.getDistance().getValue();
            int level = 0;

            if(distance <= 10) {
                level = 0;
            } else if(distance <= 50) {
                level = 1;
            } else {
                level = 2;
            }

            Users userNearby = userRepository.findById(userNearbyId).get();

            // TODO: 사용자 최신 재생 곡 정보 가져오기
//            Song song = new Song(1L, "youtubeId", "title", "artist", "img", 1);
            long songId = songQueryService.getOtherUsersRecentSong(userNearbyId);

            if(songId == -1) {
                continue;
            }

            Song song = songRepository.findById(songId).get();

            UsersNearbyResponse usersNearbyResponse = UsersNearbyResponse.of(userNearby, song, level);

            list.add(usersNearbyResponse);
        }

        return list;

    }

    public Point findUserLocation(long userId) {
        return new Point(1, 1);
    }
}
