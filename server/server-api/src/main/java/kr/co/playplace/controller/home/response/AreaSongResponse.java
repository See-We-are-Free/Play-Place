package kr.co.playplace.controller.home.response;

import kr.co.playplace.service.song.dto.SongAreaDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class AreaSongResponse {

    private List<SongAreaDto> songs;

//    public static AreaSongResponse of(Song song){
//        return AreaSongResponse.builder()
//                .songId(song.getId())
//                .youtubeId(song.getYoutubeId())
//                .title(song.getTitle())
//                .artist(song.getArtist())
//                .albumImg(song.getAlbumImg())
//                .playTime(song.getPlayTime())
//                .build();
//    }
}
