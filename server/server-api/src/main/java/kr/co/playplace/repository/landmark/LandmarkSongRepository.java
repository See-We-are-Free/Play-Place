package kr.co.playplace.repository.landmark;

import kr.co.playplace.entity.landmark.LandmarkSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LandmarkSongRepository extends JpaRepository<LandmarkSong, Long> {

    List<LandmarkSong> findAllByLandmarkId(Long landmarkId);
}
