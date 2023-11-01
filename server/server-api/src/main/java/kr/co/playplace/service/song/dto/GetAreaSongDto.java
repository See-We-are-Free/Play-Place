package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.UserLandmarkGroup;
import kr.co.playplace.service.playlist.dto.GetUserLandmarkSongDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetAreaSongDto {

    private Song song;
    private Village village;
    private int count;

}
