package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.NowPlay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NowPlayRepository extends JpaRepository<NowPlay, Long> {
    Optional<NowPlay> findByUser_Id(long userId);
}
