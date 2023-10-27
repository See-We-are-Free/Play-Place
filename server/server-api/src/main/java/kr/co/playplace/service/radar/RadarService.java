package kr.co.playplace.service.radar;

import ch.hsr.geohash.GeoHash;
import kr.co.playplace.entity.location.UserLocation;
import kr.co.playplace.repository.location.UserLocationRepository;
import kr.co.playplace.service.radar.dto.UserLocationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RadarService {

    private final UserLocationRepository userLocationRepository;

    public void findAroundUser(long userId, double longitude, double latitude) {

        GeoHash geoHash = GeoHash.withCharacterPrecision(latitude, longitude, 7);
        GeoHash[] adjHash = geoHash.getAdjacent();

        log.debug("location : {}", geoHash.toBase32());

        for(GeoHash adj : adjHash) {
            log.debug("adjLocation : {}",adj.toBase32());
        }
    }

    public void saveUserLocationTest(long userId, UserLocationDto userLocationDto) {
        UserLocation userLocation = UserLocation.builder()
                .id(userId)
                .longitude(userLocationDto.getLongitude())
                .latitude(userLocationDto.getLatitude())
                .songId(1L)
                .build();

        userLocationRepository.save(userLocation);

        log.debug("latitude: {}",userLocationRepository.findById(1L).map(UserLocation::getLatitude).orElse(0.0));
    }
}
