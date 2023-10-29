package kr.co.playplace.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.service.landmark.dto.FindLandMarkDto;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static kr.co.playplace.entity.landmark.QLandmark.landmark;

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
                        landmark.longitude,
                        landmark.representativeImg))
                .from(landmark)
                .fetch();

    }

}
