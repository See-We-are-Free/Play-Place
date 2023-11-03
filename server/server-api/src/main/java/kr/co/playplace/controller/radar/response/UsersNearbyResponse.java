package kr.co.playplace.controller.radar.response;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
public class UsersNearbyResponse {
    long userId;
    String nickname;
    long songId;
    String title;
    int level;

    public static UsersNearbyResponse of(Users user, Song song, int level) {
        return UsersNearbyResponse.builder()
                    .userId(user.getId())
                    .nickname(user.getNickname())
                    .songId(song.getId())
                    .title(song.getTitle())
                    .level(level).build();
    }
}
