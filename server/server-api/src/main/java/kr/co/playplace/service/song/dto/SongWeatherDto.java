package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.stats.SongWeatherStats;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;


@Getter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "song_weather", timeToLive = 604800)
public class SongWeatherDto {

    @Id
    private Long id;
    private Long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;
    @Indexed
    private Weather weather;
    private Long count;

    public static SongWeatherDto of(SongWeatherStats songWeatherStats){
        return SongWeatherDto.builder()
                .id(songWeatherStats.getId())
                .songId(songWeatherStats.getSong().getId())
                .youtubeId(songWeatherStats.getSong().getYoutubeId())
                .title(songWeatherStats.getSong().getTitle())
                .artist(songWeatherStats.getSong().getArtist())
                .albumImg(songWeatherStats.getSong().getAlbumImg())
                .playTime(songWeatherStats.getSong().getPlayTime())
                .weather(songWeatherStats.getWeather())
                .count(songWeatherStats.getCount())
                .build();
    }

    public SongDto toEntity(){ // ㅋㅋ?
        return SongDto.builder()
                .songId(songId)
                .youtubeId(youtubeId)
                .title(title)
                .artist(artist)
                .albumImg(albumImg)
                .playTime(playTime)
                .build();
    }
}
