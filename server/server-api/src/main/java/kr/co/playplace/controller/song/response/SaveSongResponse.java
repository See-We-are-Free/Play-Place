package kr.co.playplace.controller.song.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SaveSongResponse {
    private long playListSongId;
}
