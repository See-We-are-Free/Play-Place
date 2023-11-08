package kr.co.playplace.controller.radar.response;

import kr.co.playplace.service.radar.dto.UserLocation;
import kr.co.playplace.service.song.dto.RecentSongDto;
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

    public static UsersNearbyResponse of(UserLocation userLocation, RecentSongDto recentSongDto, int level) {
        return UsersNearbyResponse.builder()
                    .userId(userLocation.getId())
                    .nickname(userLocation.getNickname())
                    .youtubeId(recentSongDto.getYoutubeId())
                    .title(recentSongDto.getTitle())
                    .artist(recentSongDto.getArtist())
                    .albumImg(recentSongDto.getAlbumImg())
                    .level(level).build();
    }
}
