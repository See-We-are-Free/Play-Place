package kr.co.playplace.repository.location;

import kr.co.playplace.entity.location.Village;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VillageRepository extends JpaRepository<Village, Integer> {
    Optional<Village> findByCode(int code);
}
