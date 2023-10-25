package kr.co.playplace.controller.radar;

import kr.co.playplace.service.radar.RadarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/radar")
@RequiredArgsConstructor
public class RadarController {
    RadarService radarService;

    @GetMapping("/test")
    public void findTest(String location) {
        radarService.findTest(location);
    }

}
