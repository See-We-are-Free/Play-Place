package kr.co.playplace.repository.location;

import kr.co.playplace.entity.location.UserLocation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserLocationRepository extends CrudRepository<UserLocation, Long> {
}
