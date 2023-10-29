package kr.co.playplace.controller.song.response;

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
public class GetRecentSongResponse {

    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private String playTime;

    public static GetRecentSongResponse of(Song song){
        return GetRecentSongResponse.builder()
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .build();
    }
}
