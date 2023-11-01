package kr.co.playplace.controller.landmark.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@Data
public class FindLandmarkSongResponse {

    private String title;
    private String artist;
    private String albumImg;
    private Long playTime;

    @Builder
    public FindLandmarkSongResponse(String title, String artist, String albumImg, Long playTime) {
        this.title = title;
        this.artist = artist;
        this.albumImg = albumImg;
        this.playTime = playTime;
    }
}
