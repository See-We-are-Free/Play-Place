package kr.co.playplace.entity.location;

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
@RedisHash(value = "user_location", timeToLive = 600)
public class UserLocation {
    @Id
    private Long id;
    private Double latitude;
    private Double longitude;
    private Long songId;

}
