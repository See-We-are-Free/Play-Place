package kr.co.playplace.service.song;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.common.util.GetWeather;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.home.request.PositionRequest;
import kr.co.playplace.controller.home.response.AreaSongResponse;
import kr.co.playplace.controller.home.response.TimezoneSongResponse;
import kr.co.playplace.controller.home.response.WeatherSongResponse;
import kr.co.playplace.controller.song.response.GetRecentSongResponse;
import kr.co.playplace.entity.Timezone;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.*;
import kr.co.playplace.repository.stats.*;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.user.JjimRepository;
import kr.co.playplace.repository.user.NowPlayRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.song.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SongQueryService {

    private final UserRepository userRepository;
    private final UserSongRepository userSongRepository;
    private final NowPlayRepository nowPlayRepository;
    private final UserLandmarkSongRepository userLandmarkSongRepository;
    private final JjimRepository jjimRepository;

    private final SongAreaDtoRedisRepository songAreaDtoRedisRepository;
    private final SongWeatherDtoRedisRepository songWeatherDtoRedisRepository;
    private final SongTimeDtoRedisRepository songTimeDtoRedisRepository;

    private final Geocoder geocoder;
    private final GetWeather getWeather;
    private final RedisTemplate redisTemplate;

    public GetRecentSongResponse getRecentSong(){ // 가장 최근 재생 곡
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생 기록 확인 -> redis 확인 후 mysql 확인
        List<Long> playListSongIds = checkRedis(user.get());
        if(playListSongIds == null){ // mysql 확인
            Optional<NowPlay> nowPlay = nowPlayRepository.findByUser_Id(user.get().getId());
            if(nowPlay.isEmpty()){
                throw new BaseException(ErrorCode.NOT_FOUND_RECENT_SONG);
            }

            playListSongIds = new ArrayList<>();
            if(nowPlay.get().getUserSong() != null){
                playListSongIds.add(nowPlay.get().getUserSong().getId());
                playListSongIds.add(1L);
            }else if(nowPlay.get().getUserLandmarkSong() != null){
                playListSongIds.add(nowPlay.get().getUserLandmarkSong().getId());
                playListSongIds.add(0L);
            }
        }

        if(playListSongIds.get(1) == 0L){
            // landmark
            Optional<UserLandmarkSong> userLandmarkSong = userLandmarkSongRepository.findById(playListSongIds.get(0));
            boolean like = checkLike(userLandmarkSong.get().getSong(), user.get());
            return GetRecentSongResponse.of(userLandmarkSong.get().getSong(), playListSongIds.get(0), true, like);
        }else{
            // song
            Optional<UserSong> userSong = userSongRepository.findById(playListSongIds.get(0));
            boolean like = checkLike(userSong.get().getSong(), user.get());
            return GetRecentSongResponse.of(userSong.get().getSong(), playListSongIds.get(0), false, like);
        }
    }

    private boolean checkLike(Song song, Users user){
        // redis 확인
        Object check = redisTemplate.opsForHash().get("like:" + user.getId(), song.getId());
        if (check != null){
            return check.equals("true");
        }

        // mysql 확인
        return jjimRepository.existsByJjimId_UserIdAndJjimId_SongId(user.getId(), song.getId());
    }

    private List<Long> checkRedis(Users user){
        Set<String> changeUserKeys = redisTemplate.keys("play:*");
        if (changeUserKeys.isEmpty()) return null;

        for (String key : changeUserKeys) {
            long userId = Long.parseLong(key.split(":")[1]);
            if(userId == user.getId()){
                return getRecentSongInRedis(user);
            }
        }

        return null;
    }

    private List<Long> getRecentSongInRedis(Users user){
        List<Long> result = new ArrayList<>();

        Set<Object> companyIdsObjects = redisTemplate.opsForHash().keys("play:" + user.getId());
        Set<Long> playlistSongIds = companyIdsObjects.stream()
                .map(objectId -> (Long) objectId)
                .collect(Collectors.toSet());
        Long playListSongId = playlistSongIds.iterator().next();
        result.add(playListSongId);

        Object check = redisTemplate.opsForHash().get("play:" + user.getId(), playListSongId);
        if (check == null) return null;

        if (check.equals("true")) {
            result.add(0L);
        } else {
            result.add(1L);
        }
        return result;
    }

    public AreaSongResponse getSongInArea(PositionRequest positionRequest){
        int code = geocoder.getGeoCode(positionRequest.getLat(), positionRequest.getLon()); // 위경도로 읍면동 가져오기

        // redis 조회
        List<SongAreaDto> songAreaDtos = songAreaDtoRedisRepository.findAllByVillageCode(code);

        return new AreaSongResponse(songAreaDtos);
    }

    public WeatherSongResponse getSongInWeather(PositionRequest positionRequest){
        Weather weather = getWeather.getWeatherCode(positionRequest.getLat(), positionRequest.getLon());

        // redis 조회
        List<SongWeatherDto> songWeatherDtos = songWeatherDtoRedisRepository.findAllByWeatherOrderByCountDesc(weather);

        // 상위 10개 뽑아서 반환
        List<SongDto> songDtos = new ArrayList<>();
        for(int i=0; i<10; i++){
            if(songWeatherDtos.size() <= i) break;
            songDtos.add(songWeatherDtos.get(i).toEntity());
        }

        return WeatherSongResponse.builder().weather(weather).songs(songDtos).build();
    }

    public TimezoneSongResponse getSongInTimezone(){
        // 시간
        Timezone timezone = Timezone.DAWN;
        int hour = LocalDateTime.now().getHour();
        if(hour >= 6 && hour < 12){
            timezone = Timezone.MORNING;
        }else if(hour >= 12 && hour < 18){
            timezone = Timezone.LUNCH;
        }else if(hour >= 18){
            timezone = Timezone.EVENING;
        }

        // redis 조회
        List<SongTimezoneDto> songTimezoneDtos = songTimeDtoRedisRepository.findAllByTimezoneOrderByCountDesc(timezone);

        // 상위 10개 뽑아서 반환
        List<SongDto> songDtos = new ArrayList<>();
        for(int i=0; i<10; i++){
            if(songTimezoneDtos.size() <= i) break;
            songDtos.add(songTimezoneDtos.get(i).toEntity());
        }

        return TimezoneSongResponse.builder().timezone(timezone).songs(songDtos).build();
    }

    public long getOtherUsersRecentSong(long userId) {
        // 주변 사용자
        Optional<Users> user = userRepository.findById(userId);

        // 재생 기록 확인 -> redis 확인
        List<Long> playListSongIds = checkRedis(user.get());

        if(playListSongIds == null){ // mysql 확인
            Optional<NowPlay> nowPlay = nowPlayRepository.findByUser_Id(user.get().getId());
            if(nowPlay.isEmpty()){
                return -1;
            }

            playListSongIds = new ArrayList<>();
            if(nowPlay.get().getUserSong() != null){
                playListSongIds.add(nowPlay.get().getUserSong().getId());
                playListSongIds.add(1L);
            }else if(nowPlay.get().getUserLandmarkSong() != null){
                playListSongIds.add(nowPlay.get().getUserLandmarkSong().getId());
                playListSongIds.add(0L);
            }
        }

        if(playListSongIds.get(1) == 0L){
            // landmark
            Optional<UserLandmarkSong> userLandmarkSong = userLandmarkSongRepository.findById(playListSongIds.get(0));
            return userLandmarkSong.get().getSong().getId();
        }else{
            // song
            Optional<UserSong> userSong = userSongRepository.findById(playListSongIds.get(0));
            return userSong.get().getSong().getId();
        }

//        if(playListSongIds == null){
//            return -1;
//        }
//
//        Optional<UserSong> userSong = userSongRepository.findById(playListSongIds.get(0));
//        return userSong.get().getSong().getId();

    }

}
