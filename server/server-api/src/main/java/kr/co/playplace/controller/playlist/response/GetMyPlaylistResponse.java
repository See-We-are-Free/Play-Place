package kr.co.playplace.controller.playlist.response;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.UserSong;
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
//    private List<Landmark> landmarks;

    public static GetMyPlaylistResponse of(List<GetUserSongDto> basicSongs){
        return GetMyPlaylistResponse.builder()
                .basicSongsCnt(basicSongs.size())
                .basicSongs(basicSongs)
                .landmarksCnt(0)
//                .landmarks(landmarks)
                .build();
    }
}
