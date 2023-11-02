package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.Timezone;
import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.stats.SongTimeStats;
import kr.co.playplace.entity.stats.SongWeatherStats;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetTimezoneSongDto {

    private Song song;
    private Timezone timezone;
    private int count;

    public SongTimeStats toEntity(){
        return SongTimeStats.builder()
                .song(song)
                .timezone(timezone)
                .count(count)
                .build();
    }

}
