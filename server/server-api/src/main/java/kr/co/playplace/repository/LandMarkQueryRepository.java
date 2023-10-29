package kr.co.playplace.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandMarkSongResponse;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static kr.co.playplace.entity.landmark.QLandmark.landmark;
import static kr.co.playplace.entity.landmark.QLandmarkSong.landmarkSong;
import static kr.co.playplace.entity.song.QSong.song;

@Repository
public class LandMarkQueryRepository {

    private final JPAQueryFactory queryFactory;

    public LandMarkQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<FindLandMarkResponse> findLandMarks() {
        return queryFactory
                .select(Projections.constructor(FindLandMarkResponse.class,
                        landmark.title,
                        landmark.latitude,
                        landmark.langitude,
                        landmark.representativeImg))
                .from(landmark)
                .fetch();
    }

    public List<FindLandMarkSongResponse> findLandMarkSongs(Long landMarkId) {
        return queryFactory
                .select(Projections.constructor(FindLandMarkSongResponse.class,
                        landmarkSong.song.title,
                        landmarkSong.song.artist,
                        landmarkSong.song.albumImg,
                        landmarkSong.song.playTime))
                .from(landmarkSong)
                .where(landmarkSong.landmark.id.eq(landMarkId))
                .orderBy(landmarkSong.createdDate.desc())
                .limit(99)
                .fetch();


    }

}
