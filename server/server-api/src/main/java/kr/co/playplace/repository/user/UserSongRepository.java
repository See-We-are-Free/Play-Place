package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.UserSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserSongRepository extends JpaRepository<UserSong, Long> {
    List<UserSong> findAllByUser_Id(long userId);

    int countUserSongByUser_Id(long userId);
}
