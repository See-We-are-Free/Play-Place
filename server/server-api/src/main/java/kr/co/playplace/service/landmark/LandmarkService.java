package kr.co.playplace.service.landmark;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.landmark.requset.SaveLandmarkSongRequest;
import kr.co.playplace.entity.landmark.Landmark;
import kr.co.playplace.entity.landmark.LandmarkSong;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.landmark.LandmarkQueryRepository;
import kr.co.playplace.repository.landmark.LandmarkRepository;
import kr.co.playplace.repository.landmark.LandmarkSongRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.service.landmark.dto.FindLandmarkSongDto;
import kr.co.playplace.service.user.UserQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
@Transactional
public class LandmarkService {

    private final LandmarkQueryRepository landmarkQueryRepository;
    private final LandmarkRepository landmarkRepository;
    private final SongRepository songRepository;
    private final UserQueryService userQueryService;
    private final LandmarkSongRepository landmarkSongRepository;

    public void saveLandmarkSong(SaveLandmarkSongRequest request) {
        // 최근 99곡 조회
        List<FindLandmarkSongDto> songs = landmarkQueryRepository.findLandmarkSongInfo(request.getLandmarkId());

        // 노래, 사용자,랜드마크 조회
        Song song = saveSongs(request);
        Users user = userQueryService.findByEmail(SecurityUtils.getUserId()).get();
        Landmark landmark = landmarkRepository.findById(request.getLandmarkId()).get();

        // 사용자가 곡 중복체크
        if (isExistUserSong(songs, user.getId())) throw new BaseException(ErrorCode.ALREADY_ADD_SONG);
        // 곡 중복 체크
        if (isExistSong(songs, song.getId())) throw new BaseException(ErrorCode.ALREADY_EXIST_SONG);

        // 곡 저장
        landmarkSongRepository.save(LandmarkSong.builder()
                .user(user)
                .song(song)
                .landmark(landmark)
                .build());

    }

    private Song saveSongs(SaveLandmarkSongRequest request) {
        boolean isSaved = songRepository.existsByYoutubeId(request.getYoutubeId());
        if (!isSaved) { // db에 없는 곡이라면 저장
            Song song = request.toEntity();
            songRepository.save(song);
        }
        Optional<Song> song = songRepository.findByYoutubeId(request.getYoutubeId());
        return song.get();
    }

    private boolean isExistSong(List<FindLandmarkSongDto> songs, Long songId) {
        for (FindLandmarkSongDto dto : songs) {
            if (dto.getSongId().equals(songId)) return true;
        }
        return false;
    }

    private boolean isExistUserSong(List<FindLandmarkSongDto> songs, Long userId) {
        for (FindLandmarkSongDto dto : songs) {
            if (dto.getUserId().equals(userId)) return true;
        }
        return false;
    }
}
