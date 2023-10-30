package kr.co.playplace.controller.landmark.requset;

import kr.co.playplace.entity.song.Song;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SaveLandMarkSongRequest {

    private Long landMarkId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private String playTime;

    @Builder
    public SaveLandMarkSongRequest(Long landMarkId, String youtubeId, String title, String artist, String albumImg, String playTime) {
        this.landMarkId = landMarkId;
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
