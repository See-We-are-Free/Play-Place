package kr.co.playplace.controller.landmark.requset;

import kr.co.playplace.entity.song.Song;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SaveLandmarkSongRequest {

    private Long landmarkId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private Long playTime;

    @Builder
    public SaveLandmarkSongRequest(Long landmarkId, String youtubeId, String title, String artist, String albumImg, Long playTime) {
        this.landmarkId = landmarkId;
        this.youtubeId = youtubeId;
        this.title = title;
        this.artist = artist;
        this.albumImg = albumImg;
        this.playTime = playTime;
    }

    public Song toEntity() {
        return Song.builder()
                .youtubeId(youtubeId)
                .title(title)
                .artist(artist)
                .playTime(playTime)
                .albumImg(albumImg)
                .build();
    }
}
