package kr.co.playplace.repository;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.song.SongQueryRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
class SongQueryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private SongQueryRepository songQueryRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("사용자의 재생 목록에서 가장 오래 전에 추가된 곡을 조회할 수 있다.")
    @Test
    void findOldUserSong() throws Exception {
        //given
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