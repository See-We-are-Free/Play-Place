package kr.co.playplace.common.security.handler;

import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.security.util.JwtUtil;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.service.user.UserQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompConnectInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;
    private final UserQueryService userQueryService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String sessionId = (String) message.getHeaders().get("simpSessionId");

        if(StompCommand.CONNECT.equals(accessor.getCommand())) {
            String token = accessor.getFirstNativeHeader("Authorization");

            if(!jwtUtil.verifyToken(token)) {
                throw new JwtException("유효하지 않은 토큰입니다.");
            }

            // AccessToken 내부의 payload에 있는 email로 user를 조회한다. 없다면 예외를 발생시킨다 -> 정상 케이스가 아님
            Users findMember = userQueryService.findByEmail(jwtUtil.getUid(token))
                    .orElseThrow(IllegalStateException::new);

            // SecurityContext에 등록할 User 객체를 만들어준다.
            SecurityUserDto userDto = SecurityUserDto.builder()
                    .userId(findMember.getId())
                    .email(findMember.getOuthId())
                    .role("ROLE_".concat(findMember.getRole()))
                    .nickname(findMember.getNickname())
                    .build();

            Authentication auth = new UsernamePasswordAuthenticationToken(userDto, "",
                    List.of(new SimpleGrantedAuthority(userDto.getRole())));

            if (auth != null) {
                SecurityContextHolder.getContext().setAuthentication(auth);
                log.debug("stompConnectInterceptor: {}", SecurityUtils.getUser().getUserId());
                accessor.setUser(auth);
                log.debug("accessor에 등록 성공: {}", accessor.getUser());
            } else {
                // 인증 실패 처리
                throw new JwtException("인증 실패 드리겠습니다.");
            }
        }
        return message;
    }
}
