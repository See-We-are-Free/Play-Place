package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.stats.SongWeatherStats;
import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GetWeatherSongDto {

    private Song song;
    private Weather weather;
    private Long count;

    public SongWeatherStats toEntity(){
        return SongWeatherStats.builder()
                .song(song)
                .weather(weather)
                .count(count)
                .build();
    }

}
