package kr.co.playplace.service.radar;

import ch.hsr.geohash.GeoHash;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RadarService {

    public void findAroundUser(double longitude, double latitude) {

        redisTemplate.

        GeoHash geoHash = GeoHash.withCharacterPrecision(latitude, longitude, 7);
        GeoHash[] adjHash = geoHash.getAdjacent();

        log.debug("location : {}", geoHash.toBase32());

        for(GeoHash adj : adjHash) {
            log.debug("adjLocation : {}",adj.toBase32());
        }
    }
}
