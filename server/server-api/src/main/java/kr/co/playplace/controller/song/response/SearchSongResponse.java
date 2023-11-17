package kr.co.playplace.controller.song.response;

import kr.co.playplace.entity.song.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SearchSongResponse {

    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;

    public Song toEntity(){
        return Song.builder()
                .youtubeId(youtubeId)
                .title(title)
                .artist(artist)
                .playTime(-1)
                .albumImg(albumImg)
                .build();
    }

}
