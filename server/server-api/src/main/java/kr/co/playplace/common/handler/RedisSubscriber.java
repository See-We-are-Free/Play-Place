package kr.co.playplace.common.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.playplace.controller.radar.response.UsersNearbyResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String subscribeMessage = new String(message.getBody());

        try {
            List<UsersNearbyResponse> userLocation = objectMapper.readValue(subscribeMessage, List.class);

            messagingTemplate.convertAndSendToUser("", "/topic/data", userLocation);

        } catch (Exception e) {
            log.debug("잘못된 형식입니다.");
        }

    }
}
