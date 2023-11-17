package kr.co.playplace.controller.user.response;

import kr.co.playplace.entity.song.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class FindLikeListResponse {

    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    public static FindLikeListResponse of(Song song) {
        return FindLikeListResponse.builder()
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .build();
    }
}
