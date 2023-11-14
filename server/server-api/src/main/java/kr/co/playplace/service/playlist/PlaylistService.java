package kr.co.playplace.service.playlist;

import kr.co.playplace.repository.landmark.UserLandmarkGroupRepository;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
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
    private final UserLandmarkSongRepository userLandmarkSongRepository;
    private final UserLandmarkGroupRepository userLandmarkGroupRepository;

    public void deleteMySong(boolean isLandmark, long songId){
        if(isLandmark){ // 사용자 랜드마크 곡에서 삭제
            userLandmarkSongRepository.deleteById(songId);

            // TODO: group에서 song 모두 사라지면 그룹 자체를 삭제

        }else{ // 사용자 곡에서 삭제
            userSongRepository.deleteById(songId);
        }
    }

    public void deleteMyGroup(long groupId){
        userLandmarkSongRepository.deleteUserLandmarkSongByUserlandmarkGroupId(groupId);
        userLandmarkGroupRepository.deleteById(groupId);
    }
}
