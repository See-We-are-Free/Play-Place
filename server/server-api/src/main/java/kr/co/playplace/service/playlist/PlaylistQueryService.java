package kr.co.playplace.service.playlist;

import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.playlist.response.GetMyPlaylistResponse;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.repository.user.UserSongRepository;
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

    public GetMyPlaylistResponse getMyPlaylist(){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생 목록 확인
        List<UserSong> userSongs = userSongRepository.findAllByUser_Id(user.get().getId());
        List<GetUserSongDto> basicSongs = new ArrayList<>();
        for (UserSong userSong : userSongs) { // usersong entity -> usersong dto
            basicSongs.add(GetUserSongDto.of(userSong));
        }

        // TODO: 그룹 재생목록


        return GetMyPlaylistResponse.of(basicSongs);
    }
}
