package kr.co.playplace.service.playlist;

import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.repository.landmark.UserLandmarkGroupRepository;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
            Optional<UserLandmarkSong> userLandmarkSong = userLandmarkSongRepository.findById(songId);
            Long userLandmarkGroupId = userLandmarkSong.get().getUserlandmarkGroup().getId();

            userLandmarkSongRepository.deleteById(songId);

            // group에서 song 모두 사라지면 그룹 자체를 삭제
            List<UserLandmarkSong> userLandmarkSongs = userLandmarkSongRepository.findAllByUserlandmarkGroupId(userLandmarkGroupId);
            if (userLandmarkSongs.isEmpty()){
                userLandmarkGroupRepository.deleteById(userLandmarkGroupId);
            }

        }else{ // 사용자 곡에서 삭제
            userSongRepository.deleteById(songId);
        }
    }

    public void deleteMyGroup(long groupId){
        userLandmarkSongRepository.deleteUserLandmarkSongByUserlandmarkGroupId(groupId);
        userLandmarkGroupRepository.deleteById(groupId);
    }
}
