package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.service.radar.RadarService;
import kr.co.playplace.service.radar.dto.UserLocationDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/radar")
@RequiredArgsConstructor
public class RadarController {

    private final RadarService radarService;

    @GetMapping
    public void findAroundUser(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestParam Double longitude, @RequestParam Double latitude) {
        radarService.findAroundUser(securityUserDto.getUserId(), longitude, latitude);
    }

    @PostMapping
    public void saveUserLocationTest(@AuthenticationPrincipal SecurityUserDto securityUserDto, @RequestBody UserLocationDto userLocationDto) {
        radarService.saveUserLocationTest(1L, userLocationDto);
    }

}
