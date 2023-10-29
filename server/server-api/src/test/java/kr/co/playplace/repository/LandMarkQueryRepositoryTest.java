package kr.co.playplace.repository;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.service.landmark.dto.FindLandMarkDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.Assertions.tuple;

@Transactional
class LandMarkQueryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private LandMarkRepository landMarkRepository;

    @Autowired
    private LandMarkQueryRepository landMarkQueryRepository;

    // DisplayName은 상세히 적어야 좋습니다.
    @DisplayName("전체 랜드마크를 조회 할 수 있다.")
    @Test
    void findLandMarks() throws Exception {
        //given
        //data.sql 파일에 더미데이터

        //when
        List<FindLandMarkDto> results = landMarkQueryRepository.findLandMarks(); // 테스트 대상

        //then
        Assertions.assertThat(results).hasSize(3)// 원하는 기대값
                .extracting("representativeImg") // 가져온 값 일치하는지 확인
                .containsExactlyInAnyOrder(
                        "test1", "test2", "test3"
                );
        ;
    }

}