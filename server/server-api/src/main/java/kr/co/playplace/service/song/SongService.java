package kr.co.playplace.service.song;

import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.common.util.GetWeather;
import kr.co.playplace.common.util.S3Uploader;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.song.request.SaveSongHistoryRequest;
import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.UserRepository;
import kr.co.playplace.repository.location.VillageRepository;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final UserSongRepository userSongRepository;
    private final UserRepository userRepository;
    private final VillageRepository villageRepository;
    private final SongHistoryRepository songHistoryRepository;

    private final S3Uploader s3Uploader;
    private final Geocoder geocoder;
    private final GetWeather getWeather;

    public void saveSong(SaveSongRequest saveSongRequest){
        boolean alreadySaved = songRepository.existsByYoutubeId(saveSongRequest.getYoutubeId());
        if(!alreadySaved){ // db에 없는 곡이라면 저장
            String imgUrl = "";
            try {
                imgUrl = s3Uploader.upload(saveSongRequest.getAlbumImg(), "album");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            Song song = saveSongRequest.toEntity(imgUrl);
            songRepository.save(song);

            saveSongInPlayList(song);
        }else{ // db에 있다면 찾아서 재생목록에 추가
            Optional<Song> song = songRepository.findByYoutubeId(saveSongRequest.getYoutubeId());
            saveSongInPlayList(song.get());
        }
    }

    private void saveSongInPlayList(Song song){ // user 확인해서 곡을 재생목록에 추가
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());
        UserSong userSong = UserSong.builder()
                .user(user.get())
                .song(song)
                .build();
        userSongRepository.save(userSong);
    }

    public void saveSongHistory(SaveSongHistoryRequest saveSongHistoryRequest){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생한 곡
        Optional<Song> song = songRepository.findById(saveSongHistoryRequest.getSongId());

        // 1. 위도 경도로 api 호출해서 지역 코드 받아오기
        log.info("lat{} lon{}", saveSongHistoryRequest.getLat(), saveSongHistoryRequest.getLon());
        int code = geocoder.getGeoCode(saveSongHistoryRequest.getLat(), saveSongHistoryRequest.getLon());
        Optional<Village> village = villageRepository.findByCode(code);

        // 2. 위도 경도로 날씨 받아오기
        Weather weather = getWeather.getWeatherCode(saveSongHistoryRequest.getLat(), saveSongHistoryRequest.getLon());

        // 3. 곡 기록에 저장
        SongHistory songHistory = SongHistory.builder()
                .user(user.get())
                .song(song.get())
                .village(village.get())
                .weather(weather)
                .build();
        songHistoryRepository.save(songHistory);
    }
}
