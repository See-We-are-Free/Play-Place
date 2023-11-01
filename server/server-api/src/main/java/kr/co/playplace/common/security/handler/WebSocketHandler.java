package kr.co.playplace.common.security.handler;

import kr.co.playplace.common.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class WebSocketHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    // webSocket을 통해 들어온 요청이 처리되기 전에 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // webSocket 연결 시 헤더의 jwt token 검증
        if(StompCommand.CONNECT == accessor.getCommand()) {
            jwtUtil.verifyToken(accessor.getFirstNativeHeader("Authorization"));
        }
        return message;
    }
}
