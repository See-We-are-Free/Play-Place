package kr.co.playplace.controller.radar;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.*;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserLocationController {
    private final RadarService radarService;
    private final RadarQueryService radarQueryService;

    private final ObjectMapper objectMapper;

    private final RedisTemplate redisTemplate;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/location")
    public void updateUserLocationTest(Principal principal, UserLocationRequest userLocationRequest) {
        log.debug("ap: {}", principal);

        SecurityUserDto securityUserDto = ((SecurityUserDto) ((Authentication) principal).getPrincipal());

        log.debug("send_userId: {}", securityUserDto.getUserId());

        radarService.saveUserLocation(securityUserDto, userLocationRequest);

//        try {
//            List<UsersNearbyResponse> list = radarQueryService.findNearbyUsers(securityUserDto.getUserId());
//
//            if(list.isEmpty()) {
//                list = new ArrayList<>();
//            }
//
//            String message = objectMapper.writeValueAsString(list);
////            String destination = "/topic/location/" + userId;
////            redisTemplate.convertAndSend("topic", message);
////            simpMessagingTemplate.convertAndSend("/topic/location/" + securityUserDto.getUserId(), list);
//
//            simpMessagingTemplate.convertAndSendToUser(securityUserDto.getEmail(),"/queue/location", list);
//
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
    }

    @Scheduled(fixedRate = 10 * 1000)
    public void sendNearbyUsersToActiveUsers() throws JsonProcessingException {
        // 세션 연결된 사용자들한테 보냄
        Set<String> activeUsers = radarQueryService.findActiveUser();

        for(String userKey : activeUsers) {
            long userId = Long.parseLong(userKey);

            log.debug("activeUser sub: {}", userId);
            List<UsersNearbyResponse> list = radarQueryService.findNearbyUsers(userId);

            if(list.isEmpty()) {
                list = new ArrayList<>();
            }

            Map<String, Object> map = new HashMap<>();
            map.put("sendUserId", userKey);
            map.put("data", list);

//            String message = objectMapper.writeValueAsString(list);
            String message = objectMapper.writeValueAsString(map);

            redisTemplate.convertAndSend("channel", message);

//            String destination = "/topic/location/" + userId;
//            simpMessagingTemplate.convertAndSend(destination, message);

        }
    }
}
