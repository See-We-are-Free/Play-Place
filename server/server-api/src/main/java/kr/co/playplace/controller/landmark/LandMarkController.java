package kr.co.playplace.controller.landmark;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.controller.landmark.response.FindLandMarkResponse;
import kr.co.playplace.service.landmark.LandMarkQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/landmarks")
public class LandMarkController {
    private final LandMarkQueryService landMarkQueryService;

    @GetMapping
    public ApiResponse<Object> findLandMarks() {
        List<FindLandMarkResponse> responses = landMarkQueryService.findLandMarks();
        return ApiResponse.ok(responses);
    }
}
