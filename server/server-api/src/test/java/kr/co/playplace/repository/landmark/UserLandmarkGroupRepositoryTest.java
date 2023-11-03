package kr.co.playplace.repository.landmark;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.entity.user.UserLandmarkGroup;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
class UserLandmarkGroupRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserLandmarkGroupRepository userLandmarkGroupRepository;

    @DisplayName("사용자의 id와 랜드마크의 id로 사용자 랜드마크 그룹을 검색 할 수 있다.")
    @Test
    void findByUserIdAndLandmarkId() throws Exception {
        //given

        //when
        Optional<UserLandmarkGroup> userLandmarkGroup = userLandmarkGroupRepository.findByUserIdAndLandmarkId(1L, 1L);

        //then
        assertThat(userLandmarkGroup.get().getLandmark().getId()).isEqualTo(1L);

    }

    @DisplayName("사용자 id와 랜드마크 id로 사용자 랜드마크 그룹을 삭제 할 수 있다.")
    @Test
    void deleteUserLandmarkGroupByUserIdAndLandmarkId() throws Exception {
        //given

        //when
        userLandmarkGroupRepository.deleteUserLandmarkGroupByUserIdAndLandmarkId(2L, 2L);
        List<UserLandmarkGroup> landmarkGroupList = userLandmarkGroupRepository.findAll();
        //then
        assertThat(landmarkGroupList).hasSize(2);
    }

    @DisplayName("사용자가 등록한 랜드마크 그룹의 수를 가져올 수 있다.")
    @Test
    void countByUserId() throws Exception {

        //when
        int cnt = userLandmarkGroupRepository.countByUserId(1L);

        //then
        assertThat(cnt).isEqualTo(2);
    }

}