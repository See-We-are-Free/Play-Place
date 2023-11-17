package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.stats.SongAreaStats;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "song_area", timeToLive = 604800)
public class SongAreaDto {

    @Id
    private Long id;
    private Long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;
    private String villageName;
    @Indexed
    private int villageCode;

    public static SongAreaDto of(SongAreaStats songAreaStats){
        return SongAreaDto.builder()
                .id(songAreaStats.getId())
                .songId(songAreaStats.getId())
                .youtubeId(songAreaStats.getSong().getYoutubeId())
                .title(songAreaStats.getSong().getTitle())
                .artist(songAreaStats.getSong().getArtist())
                .albumImg(songAreaStats.getSong().getAlbumImg())
                .playTime(songAreaStats.getSong().getPlayTime())
                .villageName(songAreaStats.getVillage().getName())
                .villageCode(songAreaStats.getVillage().getCode())
                .build();
    }
}
