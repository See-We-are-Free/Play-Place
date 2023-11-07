package kr.co.playplace.service.user;

import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.security.dto.GeneratedToken;
import kr.co.playplace.common.security.dto.SecurityUserDto;
import kr.co.playplace.common.security.util.JwtUtil;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.entity.user.Users;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final RedisTemplate redisTemplate;

    public String save(JoinUserDto joinUserDto) {
        userRepository.save(joinUserDto.toEntity());
        GeneratedToken generatedToken = jwtUtil.generateToken(joinUserDto.getEmail(), "ROLE_USER", joinUserDto.getGoogleToken());
        return generatedToken.getAccessToken();
    }

    public void deleteUsers(SecurityUserDto userDto) {
        Optional<Users> find = userRepository.findById(userDto.getUserId());
        find.get().changeOauthId();
        userRepository.save(find.get());
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
