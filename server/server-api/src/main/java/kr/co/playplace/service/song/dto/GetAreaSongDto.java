package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.stats.SongAreaStats;
import kr.co.playplace.entity.user.UserLandmarkGroup;
import kr.co.playplace.service.playlist.dto.GetUserLandmarkSongDto;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GetAreaSongDto {

    private Song song;
    private Village village;
    private Long count;

    public SongAreaStats toEntity(){
        return SongAreaStats.builder()
                .song(song)
                .village(village)
                .count(count)
                .build();
    }

}
