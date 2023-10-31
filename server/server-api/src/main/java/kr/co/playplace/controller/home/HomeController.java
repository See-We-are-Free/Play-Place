package kr.co.playplace.controller.home;

import kr.co.playplace.controller.home.request.PositionRequest;
import kr.co.playplace.controller.home.response.SongResponse;
import kr.co.playplace.service.song.SongQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/home")
@RequiredArgsConstructor
public class HomeController {

    private final SongQueryService songQueryService;

    @PostMapping("/popular")
    public ResponseEntity<?> getSongInPosition(@RequestBody PositionRequest positionRequest){
        List<SongResponse> songResponseList = songQueryService.getSongInPosition(positionRequest);
        return ResponseEntity.ok().body(songResponseList);
    }

    @PostMapping("/weather")
    public ResponseEntity<?> getSongInWeather(@RequestBody PositionRequest positionRequest){
        List<SongResponse> songResponseList = songQueryService.getSongInWeather(positionRequest);
        return ResponseEntity.ok().body(songResponseList);
    }

    @PostMapping("/timezone")
    public ResponseEntity<?> getSongInTimezone(){
        List<SongResponse> songResponseList = songQueryService.getSongInTimezone();
        return ResponseEntity.ok().body(songResponseList);
    }
}
