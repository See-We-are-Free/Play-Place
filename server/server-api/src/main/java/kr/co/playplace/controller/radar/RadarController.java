package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.service.radar.RadarService;
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

    private final RadarService radarService;

    @GetMapping
    public ResponseEntity<List<UsersNearbyResponse>> findUsersNearby(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestParam Double longitude, @RequestParam Double latitude) {
        List<UsersNearbyResponse> usersNearbyResponses = radarService.findUsersNearby(securityUserDto.getUserId(), longitude, latitude);

        return ResponseEntity.ok().body(usersNearbyResponses);
    }

    @PostMapping
    public ResponseEntity<?> saveUserLocationTest(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestBody UserLocationRequest userLocationRequest) {
        radarService.saveUserLocationTest(securityUserDto.getUserId(), userLocationRequest);

        return ResponseEntity.noContent().build();
    }

}
