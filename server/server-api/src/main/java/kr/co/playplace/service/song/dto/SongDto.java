package kr.co.playplace.service.song.dto;

import kr.co.playplace.entity.song.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class SongDto {

    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    public static SongDto of(Song song){
        return SongDto.builder()
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .build();
    }
}
