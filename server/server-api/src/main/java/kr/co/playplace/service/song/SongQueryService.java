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
import kr.co.playplace.entity.song.SongHistory;
import kr.co.playplace.entity.stats.SongAreaStats;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.song.SongHistoryRepository;
import kr.co.playplace.repository.stats.SongAreaStatsRepository;
import kr.co.playplace.repository.stats.SongTimeStatsRepository;
import kr.co.playplace.repository.stats.SongWeatherStatsRepository;
import kr.co.playplace.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    private final Geocoder geocoder;
    private final GetWeather getWeather;

    public GetRecentSongResponse getRecentSong(){
        // 로그인한 사용자
        Optional<Users> user = userRepository.findById(SecurityUtils.getUser().getUserId());

        // 재생 기록 확인 -> TODO: redis 확인 후 mysql 확인
        List<SongHistory> songHistories = songHistoryRepository.findAllByUser_Id(user.get().getId());

        // 없으면? throw NOT_FOUND_RECENT_SONG
        if(songHistories.isEmpty()) {
            throw new BaseException(ErrorCode.NOT_FOUND_RECENT_SONG);
        }

        // 있으면? return GetRecentSongResponse
        return GetRecentSongResponse.of(songHistories.get(songHistories.size()-1).getSong());
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
