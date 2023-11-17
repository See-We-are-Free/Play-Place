package kr.co.playplace.controller.home;

import kr.co.playplace.controller.home.request.PositionRequest;
import kr.co.playplace.controller.home.response.AreaSongResponse;
import kr.co.playplace.controller.home.response.GetVillageResponse;
import kr.co.playplace.controller.home.response.TimezoneSongResponse;
import kr.co.playplace.controller.home.response.WeatherSongResponse;
import kr.co.playplace.service.location.LocationQueryService;
import kr.co.playplace.service.song.SongQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/home")
@RequiredArgsConstructor
public class HomeController {

    private final SongQueryService songQueryService;
    private final LocationQueryService locationQueryService;

    @PostMapping("/area")
    public ResponseEntity<?> getSongInArea(@RequestBody PositionRequest positionRequest){
        AreaSongResponse songResponseList = songQueryService.getSongInArea(positionRequest);
        return ResponseEntity.ok().body(songResponseList);
    }

    @PostMapping("/weather")
    public ResponseEntity<?> getSongInWeather(@RequestBody PositionRequest positionRequest){
        WeatherSongResponse songResponseList = songQueryService.getSongInWeather(positionRequest);
        return ResponseEntity.ok().body(songResponseList);
    }

    @PostMapping("/timezone")
    public ResponseEntity<?> getSongInTimezone(){
        TimezoneSongResponse songResponseList = songQueryService.getSongInTimezone();
        return ResponseEntity.ok().body(songResponseList);
    }

    @PostMapping("/village")
    public ResponseEntity<?> getVillage(@RequestBody PositionRequest positionRequest){
        GetVillageResponse getVillageResponse = locationQueryService.getVillage(positionRequest);
        return ResponseEntity.ok().body(getVillageResponse);
    }
}
