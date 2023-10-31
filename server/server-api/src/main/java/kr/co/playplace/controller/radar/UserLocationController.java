package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.security.util.JwtUtil;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.service.radar.RadarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/ws")
public class UserLocationController {
    private final JwtUtil jwtUtil;
    private final RadarService radarService;

    @MessageMapping("/location")
    public void saveUserLocationTest(@RequestHeader(value = "Authorization") final String accessToken, UserLocationRequest userLocationRequest) {

        log.debug("userId: {}", jwtUtil.getUid(accessToken));
        radarService.saveUserLocationTest(1L, userLocationRequest);
    }

}
