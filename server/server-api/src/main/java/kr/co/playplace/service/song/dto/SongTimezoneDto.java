package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.Timezone;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.stats.SongTimeStats;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Getter
@Builder
@ToString
@AllArgsConstructor
@RedisHash(value = "song_timezone", timeToLive = 604800)
public class SongTimezoneDto {

    @Id
    private Long id;
    private Long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;
    private Timezone timezone;
    private int count;

    public static SongTimezoneDto of(SongTimeStats songTimeStats){
        return SongTimezoneDto.builder()
                .id(songTimeStats.getId())
                .songId(songTimeStats.getSong().getId())
                .youtubeId(songTimeStats.getSong().getYoutubeId())
                .title(songTimeStats.getSong().getTitle())
                .artist(songTimeStats.getSong().getArtist())
                .albumImg(songTimeStats.getSong().getAlbumImg())
                .playTime(songTimeStats.getSong().getPlayTime())
                .timezone(songTimeStats.getTimezone())
                .count(songTimeStats.getCount())
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
