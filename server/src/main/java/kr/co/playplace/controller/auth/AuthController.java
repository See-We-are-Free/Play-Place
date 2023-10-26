package kr.co.playplace.controller.auth;

import kr.co.playplace.common.security.dto.StatusResponseDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.service.user.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final RefreshTokenService tokenService;

    @PostMapping("/logout")
    public ResponseEntity<StatusResponseDto> logout(@RequestHeader(value = "Authorization") final String accessToken) {
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(accessToken, SecurityUtils.getUser());

        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/refresh")
    public ResponseEntity<StatusResponseDto> refresh(@RequestHeader("Authorization") final String accessToken, HttpServletResponse response) {

        String newAccessToken = tokenService.republishAccessToken(accessToken);
        if (StringUtils.hasText(newAccessToken)) {
            response.setHeader("Authorization", "Bearer " + accessToken);
            return ResponseEntity.ok(StatusResponseDto.addStatus(200));
        }

        return ResponseEntity.badRequest().body(StatusResponseDto.addStatus(400));
    }

}