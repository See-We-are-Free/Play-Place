package kr.co.playplace.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.playplace.service.landmark.dto.FindLandMarkDto;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static kr.co.playplace.entity.landmark.QLandmark.landmark;
import static kr.co.playplace.entity.landmark.QLandmarkSong.landmarkSong;

@Repository
public class LandMarkQueryRepository {

    private final JPAQueryFactory queryFactory;

    public LandMarkQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<FindLandMarkDto> findLandMarks() {
        return queryFactory
                .select(Projections.constructor(FindLandMarkDto.class,
                        landmark.title,
                        landmark.latitude,
                        landmark.longitude,
                        landmark.representativeImg))
                .from(landmark)
                .fetch();

    }

}
