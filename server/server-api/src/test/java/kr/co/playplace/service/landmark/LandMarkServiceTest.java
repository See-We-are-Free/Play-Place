package kr.co.playplace.service.landmark;

import kr.co.playplace.IntegrationTestSupport;
import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.controller.landmark.requset.SaveLandmarkSongRequest;
import kr.co.playplace.entity.landmark.Landmark;
import kr.co.playplace.entity.user.UserLandmarkGroup;
import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.landmark.LandmarkRepository;
import kr.co.playplace.repository.landmark.UserLandmarkGroupRepository;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.testUser.WithMockCustomAccount;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;


@Transactional
class LandmarkServiceTest extends IntegrationTestSupport {

    @Autowired
    private LandmarkService landmarkService;

    @Autowired
    private LandmarkUserService landmarkUserService;

    @Autowired
    private LandmarkRepository landmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserLandmarkGroupRepository userLandmarkGroupRepository;

    @Autowired
    private UserLandmarkSongRepository userLandmarkSongRepository;

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
                .playTime(210L)
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
    void saveLandmarkSongDuplicaion() throws Exception {
        //given
        SaveLandmarkSongRequest request = SaveLandmarkSongRequest.builder()
                .landmarkId(2L)
                .title("Title1")
                .artist("Artist1")
                .albumImg("AlbumIng1")
                .youtubeId("yId1")
                .playTime(210L)
                .build();
        //when, then
        assertThatThrownBy(() -> landmarkService.saveLandmarkSong(request))
                .isInstanceOf(BaseException.class)
                .satisfies(e -> {
                    BaseException baseException = (BaseException) e;
                    assertThat(baseException.getErrorCode()).isEqualTo(ErrorCode.ALREADY_EXIST_SONG);
                });
    }

    @DisplayName("사용자가 공유 재생목록을 내 재생목록에 추가 할 때 이미 10개 있으면 예외가 발생한다.")
    @WithMockCustomAccount
    @Test
    void savaLandmarkPlayListToMyPlayListException() throws Exception {
        //given
        for (long i = 3; i <= 10; i++) {
            UserLandmarkGroup userLandmarkGroup = createUserLandmarkGroup(i, 1L);
        }
        //when, then
        assertThatThrownBy(() -> landmarkUserService.saveLandmarkPlayListToUserPlayList(1L))
                .isInstanceOf(BaseException.class)
                .satisfies(e -> {
                    BaseException baseException = (BaseException) e;
                    assertThat(baseException.getErrorCode()).isEqualTo(ErrorCode.INVALID_ADD_LANDMARK_PLAYLIST);
                });

    }

    @DisplayName("사용자는 공유 재생목록을 내 재생목록에 추가 할 수 있다.")
    @WithMockCustomAccount
    @Test
    void savaLandmarkPlayListToMyPlayList() throws Exception {
        //given

        //when
        Long landmarkGroupId = landmarkUserService.saveLandmarkPlayListToUserPlayList(1L);

        List<UserLandmarkSong> userLandmarkSongList = userLandmarkSongRepository.findAllByUserlandmarkGroupId(landmarkGroupId);
        //then
        Assertions.assertThat(userLandmarkSongList).hasSize(2);
    }


    private UserLandmarkGroup createUserLandmarkGroup(long landmarkId, long userId) {
        Landmark landmark = landmarkRepository.findById(landmarkId).get();
        Users user = userRepository.findById(userId).get();
        return userLandmarkGroupRepository.save(UserLandmarkGroup.builder()
                .user(user)
                .landmark(landmark).
                build());
    }


}