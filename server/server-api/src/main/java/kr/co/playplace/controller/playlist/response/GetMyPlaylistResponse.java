package kr.co.playplace.controller.playlist.response;

import kr.co.playplace.service.playlist.dto.GetUserLandmarkGroupDto;
import kr.co.playplace.service.playlist.dto.GetUserSongDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetMyPlaylistResponse {

    private int basicSongsCnt;
    private List<GetUserSongDto> basicSongs;
    private int landmarksCnt;
    private List<GetUserLandmarkGroupDto> landmarks;

    public static GetMyPlaylistResponse of(List<GetUserSongDto> basicSongs, List<GetUserLandmarkGroupDto> landmarks){
        return GetMyPlaylistResponse.builder()
                .basicSongsCnt(basicSongs.size())
                .basicSongs(basicSongs)
                .landmarksCnt(landmarks.size())
                .landmarks(landmarks)
                .build();
    }
}
