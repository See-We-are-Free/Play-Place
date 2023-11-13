package kr.co.playplace.service.radar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "user_location", timeToLive =  30)
public class UserLocation {
    @Id
    private Long id;
    private String nickname;
}
