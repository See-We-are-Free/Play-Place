package kr.co.playplace.service.landmark;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.entity.landmark.Landmark;
import kr.co.playplace.entity.landmark.LandmarkSong;
import kr.co.playplace.entity.user.UserLandmarkGroup;
import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.landmark.LandmarkRepository;
import kr.co.playplace.repository.landmark.LandmarkSongRepository;
import kr.co.playplace.repository.landmark.UserLandmarkGroupRepository;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class LandmarkUserService {
    private final UserLandmarkSongRepository userLandmarkSongRepository;
    private final UserLandmarkGroupRepository userLandmarkGroupRepository;
    private final LandmarkSongRepository landmarkSongRepository;
    private final UserRepository userRepository;
    private final LandmarkRepository landmarkRepository;

    public Long saveLandmarkPlayListToUserPlayList(Long landmarkId) {
        Users user = userRepository.findByOuthId(SecurityUtils.getUserId()).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
        Landmark landmark = landmarkRepository.findById(landmarkId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_LANDMARK));
        // 이미존재하는 랜드마크 공유 재생목록인지 확인
        Optional<UserLandmarkGroup> userLandmarkGroup = userLandmarkGroupRepository.findByUserIdAndLandmarkId(user.getId(), landmarkId);

        // 10곡 이상이면 못넣음
        int cnt = userLandmarkGroupRepository.countByUserId(user.getId());
        if (cnt >= 10) throw new BaseException(ErrorCode.INVALID_ADD_LANDMARK_PLAYLIST);


        if (userLandmarkGroup.isPresent()) {
            userLandmarkSongRepository.deleteUserLandmarkSongByUserlandmarkGroupId(userLandmarkGroup.get().getId());
            userLandmarkGroupRepository.deleteUserLandmarkGroupByUserIdAndLandmarkId(user.getId(), landmarkId);
        }

        // 사용자 user - landmark 저장
        UserLandmarkGroup landmarkGroup = UserLandmarkGroup.builder()
                .landmark(landmark)
                .user(user)
                .build();

        userLandmarkGroupRepository.save(landmarkGroup);
        // user - landmark song 저장
        Optional<List<LandmarkSong>> landmarkSongList = landmarkSongRepository.findAllByLandmarkId(landmarkId);
        if (landmarkSongList.isEmpty()) throw new BaseException(ErrorCode.NOT_FOUND_LANDMARK_SONG);

        for (LandmarkSong landmarkSong : landmarkSongList.get()) {
            UserLandmarkSong userLandmarkSong = UserLandmarkSong.builder()
                    .song(landmarkSong.getSong())
                    .userlandmarkGroup(landmarkGroup)
                    .build();
            userLandmarkSongRepository.save(userLandmarkSong);
        }
        return landmarkGroup.getId();
    }
}
