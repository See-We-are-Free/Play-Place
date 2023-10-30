package kr.co.playplace.controller.landmark;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.controller.landmark.requset.SaveLandMarkSongRequest;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandMarkSongResponse;
import kr.co.playplace.service.landmark.LandMarkQueryService;
import kr.co.playplace.service.landmark.LandMarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/landmarks")
public class LandMarkController {
    private final LandMarkQueryService landMarkQueryService;
    private final LandMarkService landMarkService;

    @GetMapping
    public ApiResponse<Object> findLandMarks() {
        List<FindLandMarkResponse> responses = landMarkQueryService.findLandMarks();
        return ApiResponse.ok(responses);
    }

    @GetMapping("/{landMarkId}")
    public ApiResponse<Object> findLandMarkSongs(@PathVariable Long landMarkId) {
        List<FindLandMarkSongResponse> responses = landMarkQueryService.findLandMarksSongs(landMarkId);
        return ApiResponse.ok(responses);
    }

    @PostMapping
    public ApiResponse<Object> saveLandMarkSong(@RequestBody SaveLandMarkSongRequest request) {
        landMarkService.saveLandMarkSong(request);
        return ApiResponse.messageOk("SUCCESS");
    }

}
