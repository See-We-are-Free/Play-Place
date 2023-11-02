package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.Weather;
import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@Getter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "song_weather", timeToLive = 604800)
public class SongWeatherDto {

    @Id
    private Long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;
    private Weather weather;

    public static SongWeatherDto of(Song song, Weather weather){
        return SongWeatherDto.builder()
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .weather(weather)
                .build();
    }
}
