package kr.co.playplace.controller.radar.response;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class UsersNearbyResponse {
    private long userId;
    private String nickname;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private int level;

    public static UsersNearbyResponse of(Users user, Song song, int level) {
        return UsersNearbyResponse.builder()
                    .userId(user.getId())
                    .nickname(user.getNickname())
                    .youtubeId(song.getYoutubeId())
                    .title(song.getTitle())
                    .artist(song.getArtist())
                    .albumImg(song.getAlbumImg())
                    .level(level).build();
    }
}
