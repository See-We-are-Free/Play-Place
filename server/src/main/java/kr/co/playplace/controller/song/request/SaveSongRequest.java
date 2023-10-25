package kr.co.playplace.controller.song.request;

import kr.co.playplace.entity.song.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SaveSongRequest {
    private String youtubeId;
    private String title;
    private String artist;
//    private MultipartFile albumImg;
    private String playTime;

    public Song toEntity(String albumImgUrl){
        return Song.builder()
                .youtubeId(youtubeId)
                .title(title)
                .artist(artist)
                .playTime(playTime)
                .albumImg(albumImgUrl)
                .build();
    }
}
