package kr.co.playplace.repository.auth;


import kr.co.playplace.common.security.dto.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    // accessToken으로 RefreshToken을 찾아온다.
    Optional<RefreshToken> findByAccessToken(String accessToken);
}