package kr.co.playplace.repository.location;

import kr.co.playplace.service.radar.dto.UserLocation;
import org.springframework.data.repository.CrudRepository;

public interface UserLocationRepository extends CrudRepository<UserLocation, Long> {
}
