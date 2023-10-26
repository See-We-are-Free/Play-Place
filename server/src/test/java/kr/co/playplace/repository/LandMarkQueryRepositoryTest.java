package kr.co.playplace.repository;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.repository.song.SongRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class LandMarkQueryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private LandMarkRepository landMarkRepository;

    @Autowired
    private LandMarkQueryRepository landMarkQueryRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private LandMarkSongRepository landMarkSongRepository;

    @DisplayName("전체 랜드마크를 조회 할 수 있다.")
    @Test
    void findLandMarks() throws Exception {
        //given

        landMarkQueryRepository.findLandMarks();
        //when

        //then
    }

}