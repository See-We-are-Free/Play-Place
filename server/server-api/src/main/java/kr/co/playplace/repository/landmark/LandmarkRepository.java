package kr.co.playplace.repository.landmark;

import kr.co.playplace.entity.landmark.Landmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandmarkRepository extends JpaRepository<Landmark, Long> {
}
