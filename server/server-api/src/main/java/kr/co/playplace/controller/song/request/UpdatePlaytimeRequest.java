package kr.co.playplace.controller.song.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class UpdatePlaytimeRequest {
    private String youtubeId;
    private long playTime;
}
