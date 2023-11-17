package kr.co.playplace.common.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try { 
            log.debug("message: {}", message);

            String subscribeMessage = new String(message.getBody());

            HashMap<String, Object> map = objectMapper.readValue(subscribeMessage, HashMap.class);

            String userId = map.get("sendUserId").toString();

            String listJson = objectMapper.writeValueAsString(map.get("data"));

            TypeReference<List<UsersNearbyResponse>> typeRef = new TypeReference<List<UsersNearbyResponse>>() {};
            List<UsersNearbyResponse> userLocation = objectMapper.readValue(listJson, typeRef);

            messagingTemplate.convertAndSend("/topic/location/" + userId, userLocation);
            log.debug(userId);
            log.debug(userLocation.get(0).getArtist());

        } catch (JsonProcessingException e) {
            log.debug("잘못된 형식입니다.");
        }

    }
}
