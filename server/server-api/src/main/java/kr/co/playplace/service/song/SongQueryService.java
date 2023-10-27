package kr.co.playplace.service.song;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.song.response.GetRecentSongResponse;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.UserRepository;
import kr.co.playplace.repository.song.SongHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SongQueryService {

    private final UserRepository userRepository;
    private final SongHistoryRepository songHistoryRepository;

    public GetRecentSongResponse getRecentSong(){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생 기록 확인
        List<SongHistory> songHistories = songHistoryRepository.findAllByUser_Id(user.get().getId());

        // 없으면? throw NOT_FOUND_RECENT_SONG
        if(songHistories.isEmpty()) {
            throw new BaseException(ErrorCode.NOT_FOUND_RECENT_SONG);
        }

        // 있으면? return GetRecentSongResponse
        return GetRecentSongResponse.of(songHistories.get(songHistories.size()-1).getSong());
    }
}
