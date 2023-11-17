package kr.co.playplace.common.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@AllArgsConstructor
@RedisHash(value = "jwtToken", timeToLive = 60 * 60 * 24 * 14)
public class RefreshToken implements Serializable {

    @Id
    private String id;

    @Indexed
    private String accessToken;

    private String refreshToken;

    private String googleToken;

    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    public void updateGoogleToken(String googleToken) {
        this.googleToken = googleToken;
    }

}