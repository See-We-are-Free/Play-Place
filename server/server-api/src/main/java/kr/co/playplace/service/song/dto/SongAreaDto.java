package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.location.Village;
import kr.co.playplace.entity.song.Song;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "song_area", timeToLive = 604800)
public class SongAreaDto {

    @Id
    private Long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;
    private String villageName;
    private int villageCode;

    public static SongAreaDto of(Song song, Village village){
        return SongAreaDto.builder()
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .villageName(village.getName())
                .villageCode(village.getCode())
                .build();
    }
}
