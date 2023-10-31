package kr.co.playplace.controller.radar.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Data
public class UsersNearbyResponse {
    long userId;
    String nickname;
    long songId;
    String title;
    int level;
}
