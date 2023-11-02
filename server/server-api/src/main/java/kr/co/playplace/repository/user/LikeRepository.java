package kr.co.playplace.repository.user;

import kr.co.playplace.entity.user.Like;
import kr.co.playplace.entity.user.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {

    boolean existsByLikeId_UserIdAndLikeId_SongId(long userId, long songId);
    Optional<Like> findByLikeId_UserIdAndLikeId_SongId(long userId, long songId);
}
