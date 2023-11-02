package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.service.radar.RadarQueryService;
import kr.co.playplace.service.radar.RadarService;
import kr.co.playplace.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<UsersNearbyResponse>> findUsersNearby(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestParam Double longitude, @RequestParam Double latitude) {
        List<UsersNearbyResponse> responses = radarQueryService.findUsersNearby(securityUserDto.getUserId(), longitude, latitude);
        return ResponseEntity.ok().body(responses);
    }

    @PostMapping
    public ResponseEntity<?> saveUserLocation(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestBody UserLocationRequest userLocationRequest) {
        radarService.saveUserLocation(securityUserDto.getUserId(), userLocationRequest);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping
    public ResponseEntity<Integer> changeRadarState() {
        return ResponseEntity.ok().body(userService.changeRadarState());
    }

}
