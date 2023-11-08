package kr.co.playplace.service.user;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.security.dto.GeneratedToken;
import kr.co.playplace.common.security.dto.RefreshToken;
import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.security.util.JwtUtil;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.auth.RefreshTokenRepository;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository tokenRepository;

    private final JwtUtil jwtUtil;
    private final RedisTemplate redisTemplate;

    public String save(JoinUserDto joinUserDto) {
        userRepository.save(joinUserDto.toEntity());
        GeneratedToken generatedToken = jwtUtil.generateToken(joinUserDto.getEmail(), "ROLE_USER", joinUserDto.getGoogleToken());
        return generatedToken.getAccessToken();
    }

    public void deleteUsers(String accessToken, SecurityUserDto userDto) {
        Optional<Users> find = userRepository.findById(userDto.getUserId());
        find.get().changeOauthId();
        userRepository.save(find.get());

        // google token으로 revoke url 요청 날리기
        RefreshToken token = tokenRepository.findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new);
        String googleToken = token.getGoogleToken();

        RestTemplate restTemplate = new RestTemplate();
        // 랜덤으로 세계 맥주에 대한 정보를 주는 url
        String url = "https://accounts.google.com/o/oauth2/revoke?token=" + googleToken;
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class, 25);
    }

    public int changePushState() {
        Users user = userRepository.findByOuthId(SecurityUtils.getUserId()).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
        user.changePushState();
        return user.getIsPush();
    }

    public int changeShakeState() {
        Users user = userRepository.findByOuthId(SecurityUtils.getUserId()).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
        user.changeShakeState();
        return user.getIsShake();
    }

    public int changeRadarState() {
        Users user = userRepository.findByOuthId(SecurityUtils.getUserId()).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
        user.changeRadarState();

        String key = "geoPoints:" +  user.getId();
        redisTemplate.delete(key);

        return user.getIsRadar();
    }

    public int changeProfileImg(int numImg) {
        Users user = userRepository.findByOuthId(SecurityUtils.getUserId()).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));
        user.changeProfileImg(numImg);
        return user.getProfileImg();
    }
}
