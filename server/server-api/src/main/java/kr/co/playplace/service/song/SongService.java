package kr.co.playplace.service.song;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.common.util.GetWeather;
import kr.co.playplace.common.util.S3Uploader;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.song.request.*;
import kr.co.playplace.controller.song.response.GetLikeSongResponse;
import kr.co.playplace.controller.song.response.SaveSongResponse;
import kr.co.playplace.controller.user.response.FindLikeListResponse;
import kr.co.playplace.entity.Timezone;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.stats.SongAreaStats;
import kr.co.playplace.entity.stats.SongTimeStats;
import kr.co.playplace.entity.stats.SongWeatherStats;
import kr.co.playplace.entity.user.*;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.song.RecentSongDtoRedisRepository;
import kr.co.playplace.repository.stats.*;
import kr.co.playplace.repository.user.JjimRepository;
import kr.co.playplace.repository.user.NowPlayRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.repository.location.VillageRepository;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.song.SongQueryRepository;
import kr.co.playplace.repository.song.SongRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import kr.co.playplace.service.song.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static kr.co.playplace.common.exception.ErrorCode.NOT_FOUND_SONG;

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
    private final JjimRepository jjimRepository;

    private final SongQueryRepository songQueryRepository;

    private final SongAreaDtoRedisRepository songAreaDtoRedisRepository;
    private final SongWeatherDtoRedisRepository songWeatherDtoRedisRepository;
    private final SongTimeDtoRedisRepository songTimeDtoRedisRepository;
    private final RecentSongDtoRedisRepository recentSongDtoRedisRepository;

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
        Optional<RecentSongDto> find = recentSongDtoRedisRepository.findByUserId(userId);
        find.ifPresent(recentSongDtoRedisRepository::delete);
        if(savePlaySongRequest.isLandmark()){
            Optional<UserLandmarkSong> userLandmarkSong = userLandmarkSongRepository.findById(savePlaySongRequest.getPlaylistSongId());
            Optional<Song> song = songRepository.findById(userLandmarkSong.get().getSong().getId());
            RecentSongDto recentSongDto = RecentSongDto.of(userId, song.get(), savePlaySongRequest);
            recentSongDtoRedisRepository.save(recentSongDto);
        }else{
            Optional<UserSong> userSong = userSongRepository.findById(savePlaySongRequest.getPlaylistSongId());
            Optional<Song> song = songRepository.findById(userSong.get().getSong().getId());
            RecentSongDto recentSongDto = RecentSongDto.of(userId, song.get(), savePlaySongRequest);
            recentSongDtoRedisRepository.save(recentSongDto);
        }
//        String key = "play:"+userId;
//        if(redisTemplate.hasKey(key)){
//            redisTemplate.delete(key);
//        }
//        if(savePlaySongRequest.isLandmark()){
//            redisTemplate.opsForHash().put(key, savePlaySongRequest.getPlaylistSongId(),"true");
//        }else{
//            redisTemplate.opsForHash().put(key, savePlaySongRequest.getPlaylistSongId(),"false");
//        }
    }

    // redis 저장 형태 dto로 바꿈
    @Scheduled(cron = "0 0/30 * * * ?") // Redis -> MySQL 30분 마다 동기화
    public void syncPlaySong(){
        List<RecentSongDto> recentSongDtoList = (List<RecentSongDto>) recentSongDtoRedisRepository.findAll();
        if(recentSongDtoList.isEmpty()) return;

        for (RecentSongDto recentSongDto : recentSongDtoList){
            Users user = userRepository.findById(recentSongDto.getSongId()).get();
            if(recentSongDto.isLandmark()){
                UserLandmarkSong userLandmarkSong = userLandmarkSongRepository.findById(recentSongDto.getPlayListSongId()).get();
                NowPlay nowPlay = NowPlay.builder()
                        .user(user)
                        .userSong(null)
                        .userLandmarkSong(userLandmarkSong)
                        .build();
                nowPlayRepository.save(nowPlay);
            }else{
                UserSong userSong = userSongRepository.findById(recentSongDto.getPlayListSongId()).get();
                NowPlay nowPlay = NowPlay.builder()
                        .user(user)
                        .userSong(userSong)
                        .userLandmarkSong(null)
                        .build();
                nowPlayRepository.save(nowPlay);
            }
            recentSongDtoRedisRepository.delete(recentSongDto);
        }

//        Set<String> changeUserKeys = redisTemplate.keys("play:*");
//        if (changeUserKeys.isEmpty()) return;
//
//        for (String key : changeUserKeys) {
//            long userId = Long.parseLong(key.split(":")[1]);
//            Users user = userRepository.findById(userId).orElse(null);
//            if (user != null) syncSongForNowplay(user); // mysql update
//            redisTemplate.delete(key); // Redis 데이터 삭제
//        }
    }

//    private void syncSongForNowplay(Users user){ // redis 저장 형태 dto로 바꿈 -> 필요없어짐
//        Set<Object> companyIdsObjects = redisTemplate.opsForHash().keys("play:" + user.getId());
//        Set<Long> playlistSongIds = companyIdsObjects.stream()
//                .map(objectId -> (Long) objectId)
//                .collect(Collectors.toSet());
//        Long playlistSongId = playlistSongIds.iterator().next();
//
//        Object check = redisTemplate.opsForHash().get("play:" + user.getId(), playlistSongIds.iterator().next());
//        if (check == null) return;
//        if (check.equals("true")) { // 랜드마크 송 저장
//            UserLandmarkSong userLandmarkSong = userLandmarkSongRepository.findById(playlistSongId).get();
//            NowPlay nowPlay = NowPlay.builder()
//                    .user(user)
//                    .userLandmarkSong(userLandmarkSong)
//                    .build();
//            nowPlayRepository.save(nowPlay);
//        } else { // 유저 송 저장
//            UserSong userSong = userSongRepository.findById(playlistSongId).get();
//            NowPlay nowPlay = NowPlay.builder()
//                    .user(user)
//                    .userSong(userSong)
//                    .build();
//            nowPlayRepository.save(nowPlay);
//        }
//    }

    // redis 저장 dto id 확인
    @Scheduled(cron = "0 0 10 ? * MON") // 매주 월요일 오전 10시에 실행
    public void getAreaStatistics(){
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        List<GetAreaSongDto> getAreaSongDtoList = songHistoryRepository.findAreaSong(oneWeekAgo).stream()
                .map(result -> {
                    Song song = songRepository.findById(Long.parseLong(result[0] + "")).get();
                    Village village = villageRepository.findById(Integer.parseInt(result[1] + "")).get();
                    Long count = Long.parseLong(result[2] + "");
                    return new GetAreaSongDto(song, village, count);
                })
                .collect(Collectors.toList());
//        List<GetAreaSongDto> getAreaSongDtoList = songQueryRepository.findSongsWithArea();
//        getAreaSongDtoList = getAreaSongDtoList.stream().sorted(Comparator.comparing(GetAreaSongDto::getCount).reversed()).collect(Collectors.toList()); // count로 정렬
        for(GetAreaSongDto getAreaSongDto : getAreaSongDtoList){
//            for(int i = 0; i < 10; i++){
//            if(getAreaSongDtoList.size() <= i) return; // list의 개수가 10개보다 적으면 종료
            // mysql에 저장
            SongAreaStats songAreaStats = getAreaSongDto.toEntity();
            songAreaStatsRepository.save(songAreaStats);
            // redis에 저장
            SongAreaDto songAreaDto = SongAreaDto.of(songAreaStats);
            songAreaDtoRedisRepository.save(songAreaDto);
        }
    }

    // TODO: redis 저장 dto id 확인
    @Scheduled(cron = "0 0 10 ? * MON") // 매주 월요일 오전 10시에 실행
    public void getWeatherStatistics(){
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        List<GetWeatherSongDto> getWeatherSongDtoList = songHistoryRepository.findWeatherSong(oneWeekAgo).stream()
                .map(result -> {
                    Song song = songRepository.findById(Long.parseLong(result[0] + "")).get();
                    Weather weather = Weather.values()[Integer.parseInt(result[1] + "")];
                    Long count = Long.parseLong(result[2] + "");
                    return new GetWeatherSongDto(song, weather, count);
                })
                .collect(Collectors.toList());
//        List<GetWeatherSongDto> getWeatherSongDtoList = songQueryRepository.findSongsWithWeather();
        for(GetWeatherSongDto getWeatherSongDto : getWeatherSongDtoList){
            // mysql에 저장
            SongWeatherStats songWeatherStats = getWeatherSongDto.toEntity();
            songWeatherStatsRepository.save(songWeatherStats);
            // redis에 저장
            SongWeatherDto songWeatherDto = SongWeatherDto.of(songWeatherStats);
            songWeatherDtoRedisRepository.save(songWeatherDto);
        }
    }

    // TODO: redis 저장 dto id 확인
    @Scheduled(cron = "0 0 10 ? * MON") // 매주 월요일 오전 10시에 실행
    public void getTimezoneStatistics(){
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusWeeks(1);
        List<GetTimezoneSongDto> getTimezoneSongDtoList = songHistoryRepository.findTimeZoneSong(oneWeekAgo).stream()
                .map(result -> {
                    Song song = songRepository.findById(Long.parseLong(result[0] + "")).get();
                    Timezone timezone = Timezone.values()[Integer.parseInt(result[1] + "")];
                    Long count = Long.parseLong(result[2] + "");
                    return new GetTimezoneSongDto(song, timezone, count);
                })
                .collect(Collectors.toList());
//        List<GetTimezoneSongDto> getTimezoneSongDtoList = songQueryRepository.findSongsWithTimezone();
        for(GetTimezoneSongDto getTimezoneSongDto : getTimezoneSongDtoList){
            // mysql에 저장
            SongTimeStats songTimeStats = getTimezoneSongDto.toEntity();
            songTimeStatsRepository.save(songTimeStats);
            // redis에 저장
            SongTimezoneDto songTimezoneDto = SongTimezoneDto.of(songTimeStats);
            songTimeDtoRedisRepository.save(songTimezoneDto);
        }
    }

    public void likeSong(LikeSongRequest likeSongRequest){
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());
        redisTemplate.opsForHash().put("like:" + user.get().getId(), likeSongRequest.getSongId(), likeSongRequest.isLike());
    }

    public GetLikeSongResponse getLikeSong(long songId){
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());
        log.info(user.get().toString());
        // redis -> mysql
        Set<Object> songs = redisTemplate.opsForHash().keys("like:" + user.get().getId());
        if (!songs.isEmpty()) {
            syncLike();
        }
        // mysql check
        boolean result = jjimRepository.existsByJjimId_UserIdAndJjimId_SongId(user.get().getId(), songId);
        return new GetLikeSongResponse(result);
    }

    public List<FindLikeListResponse> getLikeList(){
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());
        // redis -> mysql
        Set<Object> songs = redisTemplate.opsForHash().keys("like:" + user.get().getId());
        if (!songs.isEmpty()) {
            syncLike();
        }
        // mysql check
        List<Jjim> result = jjimRepository.findAllByJjimId_UserId(user.get().getId());
        List<FindLikeListResponse> findLikeListResponseList = new ArrayList<>();
        for(Jjim jjim : result){
            Optional<Song> song = songRepository.findById(jjim.getJjimId().getSongId());
            findLikeListResponseList.add(FindLikeListResponse.of(song.get()));
        }
        return findLikeListResponseList;
    }

    @Scheduled(cron = "0 0/30 * * * ?") // Redis -> MySQL 30분 마다 동기화
    public void syncLike() {
        Set<String> changeSongKeys = redisTemplate.keys("like:*");
        if (changeSongKeys.isEmpty()) return;
        for (String key : changeSongKeys) {
            Long userId = Long.parseLong(key.split(":")[1]);
            log.info(userId.toString());
            Users user = userRepository.findById(userId).orElse(null);
            if (user != null) syncLikeForUser(user); // mysql update
            redisTemplate.delete(key); // Redis 데이터 삭제
        }
    }

    private void syncLikeForUser(Users user) {
        Set<Object> songIdsObjects = redisTemplate.opsForHash().keys("like:" + user.getId());
        Set<Long> songIds = songIdsObjects.stream()
                .map(objectId -> (Long) objectId)
                .collect(Collectors.toSet());
        log.info(songIds.toString());

        List<Song> songs = songRepository.findAllById(songIds);
        if (songIds.isEmpty()) return;

        Set<Song> saveSong = new HashSet<>();

        for (Song song : songs) {
            Object check = redisTemplate.opsForHash().get("like:" + user.getId(), song.getId());
            if (check == null) continue;
            if (check.equals(true)) {
                log.info("true");
                if(!jjimRepository.existsByJjimId_UserIdAndJjimId_SongId(user.getId(), song.getId())) {
                    saveSong.add(song);
                }
            } else {
                log.info("false");
                Optional<Jjim> like = jjimRepository.findByJjimId_UserIdAndJjimId_SongId(user.getId(), song.getId());
                like.ifPresent(jjimRepository::delete);
            }
        }
        List<Jjim> likes = saveSong.stream().map(song -> Jjim.builder()
                .jjimId(new JjimId(user.getId(), song.getId()))
                .build()).collect(Collectors.toList());

        jjimRepository.saveAll(likes);
    }

    public void updatePlaytime(UpdatePlaytimeRequest updatePlaytimeRequest){
        // youtubeid로 찾기
        Optional<Song> find = songRepository.findByYoutubeId(updatePlaytimeRequest.getYoutubeId());
        if(find.isEmpty()){
            throw new BaseException(NOT_FOUND_SONG);
        }

        // playtime update
        Song song = Song.builder()
                .id(find.get().getId())
                .title(find.get().getTitle())
                .youtubeId(find.get().getYoutubeId())
                .albumImg(find.get().getAlbumImg())
                .artist(find.get().getArtist())
                .playTime(updatePlaytimeRequest.getPlayTime())
                .build();
        songRepository.save(song);
    }
}
