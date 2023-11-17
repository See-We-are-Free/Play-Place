package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.Jjim;
import kr.co.playplace.entity.user.JjimId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JjimRepository extends JpaRepository<Jjim, JjimId> {

    boolean existsByJjimId_UserIdAndJjimId_SongId(long userId, long songId);
    Optional<Jjim> findByJjimId_UserIdAndJjimId_SongId(long userId, long songId);
    List<Jjim> findAllByJjimId_UserId(long userId);
}
