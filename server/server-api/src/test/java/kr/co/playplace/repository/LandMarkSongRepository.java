package kr.co.playplace.repository;

import kr.co.playplace.entity.landmark.LandmarkSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkSongRepository extends JpaRepository<LandmarkSong, Long> {
}
