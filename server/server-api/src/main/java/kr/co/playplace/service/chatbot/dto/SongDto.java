package kr.co.playplace.service.chatbot.dto;

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

    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;

    public static SongDto of(Song song){
        return SongDto.builder()
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .build();
    }
}
