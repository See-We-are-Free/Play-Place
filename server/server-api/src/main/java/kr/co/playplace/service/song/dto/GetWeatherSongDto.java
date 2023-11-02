package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.stats.SongWeatherStats;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetWeatherSongDto {

    private Song song;
    private Weather weather;
    private int count;

    public SongWeatherStats toEntity(){
        return SongWeatherStats.builder()
                .song(song)
                .weather(weather)
                .count(count)
                .build();
    }

}
