package kr.co.playplace.controller.auth;

import kr.co.playplace.common.security.dto.StatusResponseDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.auth.response.TokenResponseStatus;
import kr.co.playplace.service.user.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final RefreshTokenService tokenService;

    @PostMapping("/logout")
    public ResponseEntity<StatusResponseDto> logout(@RequestHeader(value = "Authorization") final String accessToken) {
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(accessToken, SecurityUtils.getUser());

        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseStatus> refresh(@RequestHeader("Authorization") final String accessToken) {

        String newAccessToken = tokenService.republishAccessToken(accessToken);
        if (StringUtils.hasText(newAccessToken)) {
            return ResponseEntity.ok(TokenResponseStatus.addStatus(200, newAccessToken));
        }

        return ResponseEntity.badRequest().body(TokenResponseStatus.addStatus(400, null));
    }

}