package kr.co.playplace.service.playlist;

import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.playlist.response.GetMyPlaylistResponse;
import kr.co.playplace.entity.user.UserLandmarkGroup;
import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.landmark.UserLandmarkGroupRepository;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import kr.co.playplace.service.playlist.dto.GetUserLandmarkGroupDto;
import kr.co.playplace.service.playlist.dto.GetUserLandmarkSongDto;
import kr.co.playplace.service.playlist.dto.GetUserSongDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlaylistQueryService {

    private final UserSongRepository userSongRepository;
    private final UserRepository userRepository;
    private final UserLandmarkGroupRepository userLandmarkGroupRepository;
    private final UserLandmarkSongRepository userLandmarkSongRepository;

    public GetMyPlaylistResponse getMyPlaylist(){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생 목록 확인
        List<UserSong> userSongs = userSongRepository.findAllByUser_Id(user.get().getId());
        List<GetUserSongDto> basicSongs = new ArrayList<>();
        for (UserSong userSong : userSongs) { // usersong entity -> usersong dto
            basicSongs.add(GetUserSongDto.of(userSong));
        }

        // 그룹 재생목록
        List<UserLandmarkGroup> userLandmarkGroups = userLandmarkGroupRepository.findByUser_Id(user.get().getId());
        List<GetUserLandmarkGroupDto> landmarks = new ArrayList<>();
        for (UserLandmarkGroup userLandmarkGroup : userLandmarkGroups){
            List<UserLandmarkSong> userLandmarkSongs = userLandmarkSongRepository.findAllByUserlandmarkGroupId(userLandmarkGroup.getId());
            List<GetUserLandmarkSongDto> landmarkSongs = new ArrayList<>();
            for (UserLandmarkSong userLandmarkSong : userLandmarkSongs){
                landmarkSongs.add(GetUserLandmarkSongDto.of(userLandmarkSong));
            }
            landmarks.add(GetUserLandmarkGroupDto.of(userLandmarkGroup, landmarkSongs));
        }

        return GetMyPlaylistResponse.of(basicSongs, landmarks);
    }
}
