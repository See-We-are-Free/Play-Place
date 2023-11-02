package kr.co.playplace.service.song;

import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.common.util.GetWeather;
import kr.co.playplace.common.util.S3Uploader;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.song.request.SavePlaySongRequest;
import kr.co.playplace.controller.song.request.SaveSongHistoryRequest;
import kr.co.playplace.controller.song.request.SaveSongRequest;
import kr.co.playplace.controller.song.response.SaveSongResponse;
import kr.co.playplace.entity.Timezone;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.stats.SongAreaStats;
import kr.co.playplace.entity.user.NowPlay;
import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.stats.SongAreaDtoRedisRepository;
import kr.co.playplace.repository.stats.SongAreaStatsRepository;
import kr.co.playplace.repository.stats.SongTimeStatsRepository;
import kr.co.playplace.repository.stats.SongWeatherStatsRepository;
import kr.co.playplace.repository.user.NowPlayRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.repository.location.VillageRepository;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.song.SongQueryRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import kr.co.playplace.service.song.dto.GetAreaSongDto;
import kr.co.playplace.service.song.dto.SongAreaDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
    private final NowPlayRepository nowPlayRepository;
    private final UserLandmarkSongRepository userLandmarkSongRepository;
    private final SongAreaStatsRepository songAreaStatsRepository;
    private final SongWeatherStatsRepository songWeatherStatsRepository;
    private final SongTimeStatsRepository songTimeStatsRepository;

    private final SongQueryRepository songQueryRepository;

    private final SongAreaDtoRedisRepository songAreaDtoRedisRepository;

    private final S3Uploader s3Uploader;
    private final Geocoder geocoder;
    private final GetWeather getWeather;
    private final RedisTemplate redisTemplate;

    public SaveSongResponse saveSong(SaveSongRequest saveSongRequest){
        long result = 0;
        boolean alreadySaved = songRepository.existsByYoutubeId(saveSongRequest.getYoutubeId());
        if(!alreadySaved){ // db에 없는 곡이라면 저장
//            String imgUrl = "";
//            try {
//                imgUrl = s3Uploader.upload(saveSongRequest.getAlbumImg(), "album");
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//            Song song = saveSongRequest.toEntity(imgUrl);
            Song song = saveSongRequest.toEntity();
            songRepository.save(song);

            result = saveSongInPlayList(song);
        }else{ // db에 있다면 찾아서 재생목록에 추가
            Optional<Song> song = songRepository.findByYoutubeId(saveSongRequest.getYoutubeId());
            result = saveSongInPlayList(song.get());
        }

        return SaveSongResponse.builder().playListSongId(result).build();
    }

    private long saveSongInPlayList(Song song){ // user 확인해서 곡을 재생목록에 추가
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        deleteSongInPlayList(user.get());

        UserSong userSong = UserSong.builder()
                .user(user.get())
                .song(song)
                .build();
        userSongRepository.save(userSong);
        return userSong.getId();
    }

    private void deleteSongInPlayList(Users user){
        int cnt = userSongRepository.countUserSongByUser_Id(user.getId()); // 개수 세기
        if(cnt < 999) return; // 999개보다 적으면 삭제할 필요 없음
        List<Long> result = songQueryRepository.findOldUserSong(user); // 삭제해야 될 id 찾기
        if(result.isEmpty()) return;
        userSongRepository.deleteById(result.get(0));
    }

    public void saveSongHistory(SaveSongHistoryRequest saveSongHistoryRequest){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생한 곡
        Optional<Song> song = songRepository.findById(saveSongHistoryRequest.getSongId());

        // 1. 위도 경도로 api 호출해서 지역 코드 받아오기
        int code = geocoder.getGeoCode(saveSongHistoryRequest.getLat(), saveSongHistoryRequest.getLon());
        Optional<Village> village = villageRepository.findByCode(code);

        // 2. 위도 경도로 날씨 받아오기
        Weather weather = getWeather.getWeatherCode(saveSongHistoryRequest.getLat(), saveSongHistoryRequest.getLon());

        // + 시간대 enum으로 저장
        Timezone timezone = Timezone.DAWN;
        int hour = LocalDateTime.now().getHour();
        if(hour >= 6 && hour < 12){
            timezone = Timezone.MORNING;
        }else if(hour >= 12 && hour < 18){
            timezone = Timezone.LUNCH;
        }else if(hour >= 18){
            timezone = Timezone.EVENING;
        }

        // 3. 곡 기록에 저장
        SongHistory songHistory = SongHistory.builder()
                .user(user.get())
                .song(song.get())
                .village(village.get())
                .weather(weather)
                .timezone(timezone)
                .build();
        songHistoryRepository.save(songHistory);
    }

    public void playSong(SavePlaySongRequest savePlaySongRequest){ // redis에 저장
        long userId = SecurityUtils.getUser().getUserId();
        String key = "play:"+userId;
        if(redisTemplate.hasKey(key)){
            redisTemplate.delete(key);
        }
        if(savePlaySongRequest.isLandmark()){
            redisTemplate.opsForHash().put(key, savePlaySongRequest.getPlaylistSongId(),"true");
        }else{
            redisTemplate.opsForHash().put(key, savePlaySongRequest.getPlaylistSongId(),"false");
        }
    }

    @Scheduled(cron = "0 0/30 * * * ?") // Redis -> MySQL 30분 마다 동기화
    public void syncPlaySong(){
        Set<String> changeUserKeys = redisTemplate.keys("play:*");
        if (changeUserKeys.isEmpty()) return;

        for (String key : changeUserKeys) {
            long userId = Long.parseLong(key.split(":")[1]);
            Users user = userRepository.findById(userId).orElse(null);
            if (user != null) syncSongForNowplay(user); // mysql update
            redisTemplate.delete(key); // Redis 데이터 삭제
        }
    }

    private void syncSongForNowplay(Users user){
        Set<Object> companyIdsObjects = redisTemplate.opsForHash().keys("play:" + user.getId());
        Set<Long> playlistSongIds = companyIdsObjects.stream()
                .map(objectId -> (Long) objectId)
                .collect(Collectors.toSet());
        Long playlistSongId = playlistSongIds.iterator().next();

        Object check = redisTemplate.opsForHash().get("play:" + user.getId(), playlistSongIds.iterator().next());
        if (check == null) return;
        if (check.equals("true")) { // 랜드마크 송 저장
            UserLandmarkSong userLandmarkSong = userLandmarkSongRepository.findById(playlistSongId).get();
            NowPlay nowPlay = NowPlay.builder()
                    .user(user)
                    .userLandmarkSong(userLandmarkSong)
                    .build();
            nowPlayRepository.save(nowPlay);
        } else { // 유저 송 저장
            UserSong userSong = userSongRepository.findById(playlistSongId).get();
            NowPlay nowPlay = NowPlay.builder()
                    .user(user)
                    .userSong(userSong)
                    .build();
            nowPlayRepository.save(nowPlay);
        }
    }

    @Scheduled(cron = "0 0 10 ? * MON") // 매주 월요일 오전 10시에 실행
    public void getAreaStatistics(){
        List<GetAreaSongDto> getAreaSongDtoList = songQueryRepository.findSongsWithArea();
        getAreaSongDtoList = getAreaSongDtoList.stream().sorted(Comparator.comparing(GetAreaSongDto::getCount).reversed()).collect(Collectors.toList()); // count로 정렬
        for(int i=0; i<10; i++){
            if(getAreaSongDtoList.size() <= i) return; // list의 개수가 10개보다 적으면 종료
            // mysql에 저장
            SongAreaStats songAreaStats = getAreaSongDtoList.get(i).toEntity();
            songAreaStatsRepository.save(songAreaStats);
            // redis에 저장
            SongAreaDto songAreaDto = SongAreaDto.of(getAreaSongDtoList.get(i).getSong(), getAreaSongDtoList.get(i).getVillage());
            songAreaDtoRedisRepository.save(songAreaDto);
        }
    }
}
