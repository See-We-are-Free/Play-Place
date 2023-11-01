package kr.co.playplace.service.playlist.dto;

import kr.co.playplace.entity.user.UserLandmarkSong;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetUserLandmarkSongDto {

    private long landmarkSongId;
    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    public static GetUserLandmarkSongDto of(UserLandmarkSong userLandmarkSong){
        return GetUserLandmarkSongDto.builder()
                .landmarkSongId(userLandmarkSong.getId())
                .songId(userLandmarkSong.getSong().getId())
                .youtubeId(userLandmarkSong.getSong().getYoutubeId())
                .title(userLandmarkSong.getSong().getTitle())
                .artist(userLandmarkSong.getSong().getArtist())
                .albumImg(userLandmarkSong.getSong().getAlbumImg())
                .playTime(userLandmarkSong.getSong().getPlayTime())
                .build();
    }
}
