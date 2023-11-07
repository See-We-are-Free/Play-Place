package kr.co.playplace.controller.landmark;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.controller.landmark.requset.SaveLandmarkSongRequest;
import kr.co.playplace.controller.landmark.response.FindLandmarkResponse;
import kr.co.playplace.controller.landmark.response.FindLandmarkSongResponse;
import kr.co.playplace.controller.landmark.response.SearchLandmarkResponse;
import kr.co.playplace.service.landmark.LandmarkQueryService;
import kr.co.playplace.service.landmark.LandmarkService;
import kr.co.playplace.service.landmark.LandmarkUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/landmarks")
public class LandmarkController {
    private final LandmarkQueryService landmarkQueryService;
    private final LandmarkService landmarkService;
    private final LandmarkUserService landmarkUserService;
    @GetMapping
    public ApiResponse<Object> findlandmarks() {
        List<FindLandmarkResponse> responses = landmarkQueryService.findLandmarks();
        return ApiResponse.ok(responses);
    }

    @GetMapping("/{landmarkId}")
    public ApiResponse<Object> findLandmarkSongs(@PathVariable Long landmarkId) {
        List<FindLandmarkSongResponse> responses = landmarkQueryService.findLandmarksSongs(landmarkId);
        return ApiResponse.ok(responses);
    }

    @PostMapping
    public ApiResponse<Object> saveLandmarkSong(@RequestBody SaveLandmarkSongRequest request) {
        landmarkService.saveLandmarkSong(request);
        return ApiResponse.messageOk("SUCCESS");
    }

    @PostMapping("/{landmarkId}")
    public ApiResponse<Object> savaLandmarkListToMyList(@PathVariable Long landmarkId) {
        landmarkUserService.saveLandmarkPlayListToUserPlayList(landmarkId);
        return ApiResponse.messageOk("SUCCESS");
    }

    @GetMapping("/search/{keyword}")
    public ApiResponse<Object> searchLandmark(@PathVariable String keyword) {
        List<SearchLandmarkResponse> responses = landmarkQueryService.searchLandmark(keyword);
        return ApiResponse.ok(responses);
    }

}
