package kr.co.playplace.service.playlist;

import kr.co.playplace.repository.user.UserSongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlaylistService {

    private final UserSongRepository userSongRepository;

    public void deleteMySong(boolean isLandmark, long songId){
        if(isLandmark){
            // TODO: 사용자 랜드마크 곡에서 삭제
        }else{ // 사용자 곡에서 삭제
            userSongRepository.deleteById(songId);
        }

        return;
    }
}
