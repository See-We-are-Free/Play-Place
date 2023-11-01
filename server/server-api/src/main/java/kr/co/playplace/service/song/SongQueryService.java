package kr.co.playplace.service.song;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.util.Geocoder;
import kr.co.playplace.common.util.GetWeather;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.home.request.PositionRequest;
import kr.co.playplace.controller.home.response.SongResponse;
import kr.co.playplace.controller.song.response.GetRecentSongResponse;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.stats.SongAreaStats;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.stats.SongAreaStatsRepository;
import kr.co.playplace.repository.stats.SongTimeStatsRepository;
import kr.co.playplace.repository.stats.SongWeatherStatsRepository;
import kr.co.playplace.entity.user.NowPlay;
import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.repository.landmark.UserLandmarkSongRepository;
import kr.co.playplace.repository.user.NowPlayRepository;
import kr.co.playplace.repository.user.UserSongRepository;
import kr.co.playplace.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static kr.co.playplace.common.exception.ErrorCode.NOT_FOUND_AREA_SONG;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SongQueryService {

    private final UserRepository userRepository;
    private final SongHistoryRepository songHistoryRepository;
    private final SongAreaStatsRepository songAreaStatsRepository;
    private final SongTimeStatsRepository songTimeStatsRepository;
    private final SongWeatherStatsRepository songWeatherStatsRepository;
    private final UserSongRepository userSongRepository;
    private final NowPlayRepository nowPlayRepository;
    private final UserLandmarkSongRepository userLandmarkSongRepository;

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
            return GetRecentSongResponse.of(userLandmarkSong.get().getSong(), playListSongIds.get(0), true);
        }else{
            // song
            Optional<UserSong> userSong = userSongRepository.findById(playListSongIds.get(0));
            return GetRecentSongResponse.of(userSong.get().getSong(), playListSongIds.get(0), false);
        }
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

    public List<SongResponse> getSongInArea(PositionRequest positionRequest){
        int code = geocoder.getGeoCode(positionRequest.getLat(), positionRequest.getLon()); // 위경도로 읍면동 가져오기

        List<SongAreaStats> stats = songAreaStatsRepository.findAllByVillage_Code(code);
        if (stats.isEmpty()){
            throw new BaseException(NOT_FOUND_AREA_SONG);
        }

        // TODO: 저장된 시간을 기준으로 가져올건지 애초에 저장할 때 삭제하고 저장할건지 생각해보기

        return null;
    }

    public List<SongResponse> getSongInWeather(PositionRequest positionRequest){
        Weather weather = getWeather.getWeatherCode(positionRequest.getLat(), positionRequest.getLon());

        // TODO: 저장된 시간을 기준으로 가져올건지 애초에 저장할 때 삭제하고 저장할건지 생각해보기

        return null;
    }

    public List<SongResponse> getSongInTimezone(){
        // TODO: 저장된 시간을 기준으로 가져올건지 애초에 저장할 때 삭제하고 저장할건지 생각해보기
        
        return null;
    }
}
