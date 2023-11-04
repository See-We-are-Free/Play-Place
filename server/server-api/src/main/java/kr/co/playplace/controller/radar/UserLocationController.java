package kr.co.playplace.controller.radar;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.radar.request.UserLocationRequest;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.service.radar.RadarQueryService;
import kr.co.playplace.service.radar.RadarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
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
        radarService.saveUserLocation(3L, userLocationRequest);
    }

    @Scheduled(fixedRate = 10 * 1000)
    public void sendNearbyUsers() {
        // 세션 연결된 사용자들한테 보냄
        log.debug("가라");
        List<UsersNearbyResponse> list = radarQueryService.findNearbyUsers(1);

        String destination = "/topic/location/" + 1;
        messagingTemplate.convertAndSend(destination, list);
    }
}
