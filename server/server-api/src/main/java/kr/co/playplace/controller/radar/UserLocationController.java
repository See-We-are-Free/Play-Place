package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.service.radar.RadarQueryService;
import kr.co.playplace.service.radar.RadarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserLocationController {
    private final RadarService radarService;
    private final RadarQueryService radarQueryService;

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/location")
    public void updateUserLocationTest(UserLocationRequest userLocationRequest) {
        log.debug("야!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        radarService.saveUserLocation(1L, userLocationRequest);
    }

    @Scheduled(fixedRate = 30 * 1000)
    public void sendNearbyUsers() {
        List<UsersNearbyResponse> list = radarQueryService.findNearbyUsers(1);
        messagingTemplate.convertAndSendToUser("1", "/topic", list);
    }
}
