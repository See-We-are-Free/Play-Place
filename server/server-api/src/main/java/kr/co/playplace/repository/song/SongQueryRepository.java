package kr.co.playplace.repository.song;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.playplace.common.util.OrderByNull;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.service.song.dto.GetAreaSongDto;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.time.LocalDateTime;
import java.util.List;

import static kr.co.playplace.entity.song.QSongHistory.songHistory;
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

    public List<GetAreaSongDto> findSongsWithArea(){
        return queryFactory
                .select(
                        Projections.fields(GetAreaSongDto.class,
                                songHistory.song,
                                songHistory.village,
                                songHistory.song.id.count().as("count"))
                )
                .from(songHistory)
                .groupBy(songHistory.song, songHistory.village)
                .having(recentOneWeek(songHistory.createdDate))
                .orderBy(OrderByNull.DEFAULT) // 인덱스가 없는 group by 쿼리는 filesort를 하기 때문에 성능이 느릴 수 있음 -> 정렬이 필요 없는 경우 order by null으로 성능을 향상 시킬 수 있음
                .fetch();
    }

    private BooleanExpression recentOneWeek(DateTimePath<LocalDateTime> date){
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        return date.after(oneWeekAgo);
    }

}
