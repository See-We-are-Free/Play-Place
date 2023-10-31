package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.service.radar.RadarService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/ws")
public class UserLocationController {
    RadarService radarService;

    @MessageMapping("/location")
    public void saveUserLocationTest(UserLocationRequest userLocationRequest) {
        log.debug("userId: {}", SecurityUtils.getUser().getUserId());
        radarService.saveUserLocationTest(1L, userLocationRequest);
    }

}
