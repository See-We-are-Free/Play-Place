package kr.co.playplace.service.user;


import kr.co.playplace.common.security.dto.RefreshToken;
import kr.co.playplace.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Transactional
@Service
public class AccessTokenService {

    private final RefreshTokenRepository tokenRepository;

    public void saveTokenInfo(String email, String refreshToken, String accessToken) {
        tokenRepository.save(new RefreshToken(email, accessToken, refreshToken));

    }
}