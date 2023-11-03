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

    private long playListSongId;
    private boolean isLandmark;

    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    private boolean like;

    public static GetRecentSongResponse of(Song song, long playListSongId, boolean isLandmark, boolean like){
        return GetRecentSongResponse.builder()
                .playListSongId(playListSongId)
                .isLandmark(isLandmark)
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .like(like)
                .build();
    }
}
