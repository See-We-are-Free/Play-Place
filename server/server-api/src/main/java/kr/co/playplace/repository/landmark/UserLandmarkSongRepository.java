package kr.co.playplace.repository.landmark;

import kr.co.playplace.entity.user.UserLandmarkSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLandmarkSongRepository extends JpaRepository<UserLandmarkSong, Long> {

    void deleteUserLandmarkSongByUserlandmarkGroupId(Long userLandmarkGroupId);

    List<UserLandmarkSong> findAllByUserlandmarkGroupId(Long userLandmarkGroupId);
}
