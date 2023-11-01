package kr.co.playplace.service.user;

import kr.co.playplace.common.security.dto.GeneratedToken;
import kr.co.playplace.common.security.util.JwtUtil;
import kr.co.playplace.repository.user.UserRepository;
import kr.co.playplace.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    public String save(JoinUserDto joinUserDto) {
        userRepository.save(joinUserDto.toEntity());
        GeneratedToken generatedToken = jwtUtil.generateToken(joinUserDto.getEmail(),"ROLE_USER");
        return generatedToken.getAccessToken();
    }
}
