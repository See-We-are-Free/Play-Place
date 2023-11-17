package kr.co.playplace.service.user;

import kr.co.playplace.common.security.dto.RefreshToken;
import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.security.util.JwtUtil;
import kr.co.playplace.repository.auth.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    public void removeRefreshToken(String accessToken, SecurityUserDto userDto) {
        RefreshToken token = tokenRepository.findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new);

        String id = String.valueOf(userDto.getUserId());

        tokenRepository.delete(token);
    }

    public String republishAccessToken(String accessToken) {
        // 액세스 토큰으로 Refresh 토큰 객체를 조회
        Optional<RefreshToken> refreshToken = tokenRepository.findByAccessToken(accessToken);

        // RefreshToken이 존재하고 유효하다면 실행
        if (refreshToken.isPresent() && jwtUtil.verifyToken(refreshToken.get().getRefreshToken())) {
            // RefreshToken 객체를 꺼내온다.
            RefreshToken resultToken = refreshToken.get();
            // 권한과 아이디를 추출해 새로운 액세스토큰을 만든다.
            String newAccessToken = jwtUtil.generateAccessToken(resultToken.getId(), jwtUtil.getRole(resultToken.getRefreshToken()));
            // 액세스 토큰의 값을 수정해준다.
            resultToken.updateAccessToken(newAccessToken);
            tokenRepository.save(resultToken);
            // 새로운 액세스 토큰을 반환해준다.
            return newAccessToken;
        }

        return null;
    }
}