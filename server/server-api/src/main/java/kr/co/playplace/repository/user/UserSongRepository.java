package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.UserSong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSongRepository extends JpaRepository<UserSong, Long> {
}
