package kr.co.playplace.repository.song;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.playplace.entity.user.Users;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;

import static kr.co.playplace.entity.user.QUserSong.userSong;

@Repository
public class SongQueryRepository {

    private final JPAQueryFactory queryFactory;

    public SongQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<Long> findOldUserSong(Users user) {
        return queryFactory
                .select(userSong.id)
                .from(userSong)
                .where(userSong.user.eq(user)
                        .and(userSong.createdDate.eq(
                                JPAExpressions.select(userSong.createdDate.min())
                                        .from(userSong)
                                        .where(userSong.user.eq(user))
                        )))
                .limit(1)
                .fetch();
    }

}
