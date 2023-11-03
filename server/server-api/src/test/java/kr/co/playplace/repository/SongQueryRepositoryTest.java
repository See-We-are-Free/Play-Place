package kr.co.playplace.repository;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.controller.landmark.response.FindLandmarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandmarkSongResponse;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.landmark.LandmarkQueryRepository;
import kr.co.playplace.repository.landmark.LandmarkRepository;
import kr.co.playplace.repository.song.SongQueryRepository;
import kr.co.playplace.repository.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
class SongQueryRepositoryTest extends IntegrationTestSupport {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongQueryRepository songQueryRepository;

    @DisplayName("재생목록에 가장 오래 전에 저장된 곡을 가져올 수 있다.")
    @Test
    void findOldUserSong() throws Exception {
        //given
        //data.sql 파일에 더미데이터
        Users user = userRepository.findById(1L).get();

        //when
        List<Long> results = songQueryRepository.findOldUserSong(user); // 테스트 대상

        //then
        Assertions.assertThat(results).hasSize(1)// 원하는 기대값
                .containsExactlyInAnyOrder(
                        1L
                );

    }

}