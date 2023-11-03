package kr.co.playplace.controller.song.response;

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

}
