package kr.co.playplace.service.landmark;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.controller.landmark.requset.SaveLandmarkSongRequest;
import kr.co.playplace.testUser.WithMockCustomAccount;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;


@Transactional
class LandmarkServiceTest extends IntegrationTestSupport {

    @Autowired
    private LandmarkService landmarkService;

    @DisplayName("랜드마크에 곡을 추가 할 때 사용자가 이전에 등록했다면(최근 99곡) 예외가 발생한다.")
    @WithMockCustomAccount
    @Test
    void saveLandmarkSongBefore() throws Exception {
        //given
        SaveLandmarkSongRequest request = SaveLandmarkSongRequest.builder()
                .landmarkId(1L)
                .title("Title1")
                .artist("Artist1")
                .albumImg("AlbumIng1")
                .youtubeId("yId1")
                .playTime("03:30")
                .build();

        //when, then
        assertThatThrownBy(() -> landmarkService.saveLandmarkSong(request))
                .isInstanceOf(BaseException.class)
                .satisfies(e -> {
                    BaseException baseException = (BaseException) e;
                    assertThat(baseException.getErrorCode()).isEqualTo(ErrorCode.ALREADY_ADD_SONG);
                });
    }

    @DisplayName("랜드마크에 곡을 추가시 이미 있는 곡이라면 예외가 발생한다.")
    @WithMockCustomAccount
    @Test
    void savelandmarkSongDuplicaion() throws Exception {
        //given
        SaveLandmarkSongRequest request = SaveLandmarkSongRequest.builder()
                .landmarkId(2L)
                .title("Title1")
                .artist("Artist1")
                .albumImg("AlbumIng1")
                .youtubeId("yId1")
                .playTime("03:30")
                .build();
        //when, then
        assertThatThrownBy(() -> landmarkService.saveLandmarkSong(request))
                .isInstanceOf(BaseException.class)
                .satisfies(e -> {
                    BaseException baseException = (BaseException) e;
                    assertThat(baseException.getErrorCode()).isEqualTo(ErrorCode.ALREADY_EXIST_SONG);
                });
    }


}