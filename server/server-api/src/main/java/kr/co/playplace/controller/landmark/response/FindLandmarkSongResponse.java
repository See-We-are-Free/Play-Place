package kr.co.playplace.controller.landmark.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@Data
public class FindLandmarkSongResponse {

    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private Long playTime;

    @Builder
    public FindLandmarkSongResponse(long songId, String youtubeId, String title, String artist, String albumImg, Long playTime) {
        this.songId = songId;
        this.youtubeId = youtubeId;
        this.title = title;
        this.artist = artist;
        this.albumImg = albumImg;
        this.playTime = playTime;
    }
}
