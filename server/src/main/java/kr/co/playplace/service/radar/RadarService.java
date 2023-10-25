package kr.co.playplace.service.radar;

import ch.hsr.geohash.GeoHash;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RadarService {
    public void findTest(String location) {

        GeoHash geoHash = GeoHash.fromGeohashString(location);
        GeoHash[] adjHash = geoHash.getAdjacent();

        for(GeoHash adj : adjHash) {
            log.debug(adj.toBase32());
        }
    }
}
