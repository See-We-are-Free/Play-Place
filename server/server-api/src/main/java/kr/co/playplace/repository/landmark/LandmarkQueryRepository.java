package kr.co.playplace.repository.landmark;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.playplace.controller.landmark.response.FindLandmarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandmarkSongResponse;
import kr.co.playplace.controller.landmark.response.SearchLandmarkResponse;
import kr.co.playplace.entity.landmark.Landmark;
import kr.co.playplace.service.landmark.dto.FindLandmarkSongDto;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static kr.co.playplace.entity.landmark.QLandmark.landmark;
import static kr.co.playplace.entity.landmark.QLandmarkSong.landmarkSong;


@Repository
public class LandmarkQueryRepository {

    private final JPAQueryFactory queryFactory;

    public LandmarkQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<FindLandmarkResponse> findLandmarks() {
        return queryFactory
                .select(Projections.constructor(FindLandmarkResponse.class,
                        landmark.id,
                        landmark.title,
                        landmark.latitude,
                        landmark.longitude,
                        landmark.representativeImg))
                .from(landmark)
                .fetch();
    }

    public List<FindLandmarkSongResponse> findLandmarkSongs(Long landmarkId) {
        return queryFactory
                .select(Projections.constructor(FindLandmarkSongResponse.class,
                        landmarkSong.song.id,
                        landmarkSong.song.youtubeId,
                        landmarkSong.song.title,
                        landmarkSong.song.artist,
                        landmarkSong.song.albumImg,
                        landmarkSong.song.playTime))
                .from(landmarkSong)
                .where(landmarkSong.landmark.id.eq(landmarkId))
                .orderBy(landmarkSong.createdDate.desc())
                .limit(99)
                .fetch();
    }

    public List<FindLandmarkSongDto> findLandmarkSongInfo(Long landmarkId) {
        return queryFactory
                .select(Projections.constructor(FindLandmarkSongDto.class,
                        landmarkSong.user.id,
                        landmarkSong.song.id))
                .from(landmarkSong)
                .where(landmarkSong.landmark.id.eq(landmarkId))
                .orderBy(landmarkSong.createdDate.desc())
                .limit(99)
                .fetch();
    }

    public List<Landmark> searchLandmark(String keyword) {
        return queryFactory
                .select(landmark)
                .from(landmark)
                .where(containKeyword(keyword))
                .orderBy(landmark.title.asc())
                .fetch();
    }

    private BooleanExpression containKeyword(String keyword) {
        if(keyword == null || keyword.isEmpty()) {
            return null;
        }
        return landmark.title.containsIgnoreCase(keyword);
    }
}
