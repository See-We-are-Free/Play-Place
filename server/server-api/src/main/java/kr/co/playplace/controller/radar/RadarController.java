package kr.co.playplace.controller.radar;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.service.radar.RadarQueryService;
import kr.co.playplace.service.radar.RadarService;
import kr.co.playplace.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/radar")
@RequiredArgsConstructor
public class RadarController {

    private final RadarQueryService radarQueryService;
    private final RadarService radarService;
    private final UserService userService;

    @GetMapping
    public ApiResponse<List<UsersNearbyResponse>> findNearbyUsers(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestParam Double longitude, @RequestParam Double latitude) {
        List<UsersNearbyResponse> responses = radarQueryService.findNearbyUsers(securityUserDto.getUserId());
        return ApiResponse.ok(responses);
    }

    @PostMapping
    public ApiResponse<?> saveUserLocation(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestBody UserLocationRequest userLocationRequest) {
        radarService.saveUserLocation(securityUserDto.getUserId(), userLocationRequest);
        return ApiResponse.messageOk("Success");
    }

    @PatchMapping
    public ApiResponse<Integer> changeRadarState() {
        return ApiResponse.ok(userService.changeRadarState());
    }

}
