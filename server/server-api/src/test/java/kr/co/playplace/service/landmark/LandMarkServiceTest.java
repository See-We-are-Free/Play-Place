package kr.co.playplace.service.landmark;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.landmark.requset.SaveLandMarkSongRequest;
import kr.co.playplace.testUser.WithMockCustomAccount;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;


@Transactional
class LandMarkServiceTest extends IntegrationTestSupport {

    @Autowired
    private LandMarkService landMarkService;

    @DisplayName("랜드마크에 곡을 추가 할 때 사용자가 이전에 등록했다면(최근 99곡) 예외가 발생한다.")
    @WithMockCustomAccount
    @Test
    void saveLandMarkSongBefore() throws Exception {
        //given
        SaveLandMarkSongRequest request = SaveLandMarkSongRequest.builder()
                .landMarkId(1L)
                .title("Title1")
                .artist("Artist1")
                .albumImg("AlbumIng1")
                .youtubeId("yId1")
                .playTime("03:30")
                .build();

        //when, then
        assertThatThrownBy(() -> landMarkService.saveLandMarkSong(request))
                .isInstanceOf(BaseException.class)
                .satisfies(e -> {
                    BaseException baseException = (BaseException) e;
                    assertThat(baseException.getErrorCode()).isEqualTo(ErrorCode.ALREADY_ADD_SONG);
                });
    }

    @DisplayName("랜드마크에 곡을 추가시 이미 있는 곡이라면 예외가 발생한다.")
    @WithMockCustomAccount
    @Test
    void saveLandMarkSongDuplicaion() throws Exception {
        //given
        SaveLandMarkSongRequest request = SaveLandMarkSongRequest.builder()
                .landMarkId(2L)
                .title("Title1")
                .artist("Artist1")
                .albumImg("AlbumIng1")
                .youtubeId("yId1")
                .playTime("03:30")
                .build();
        //when, then
        assertThatThrownBy(() -> landMarkService.saveLandMarkSong(request))
                .isInstanceOf(BaseException.class)
                .satisfies(e -> {
                    BaseException baseException = (BaseException) e;
                    assertThat(baseException.getErrorCode()).isEqualTo(ErrorCode.ALREADY_EXIST_SONG);
                });
    }


}