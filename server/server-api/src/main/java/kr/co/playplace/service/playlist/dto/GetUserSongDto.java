package kr.co.playplace.service.playlist.dto;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.UserSong;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetUserSongDto {

    private long basicSongId;
    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    public static GetUserSongDto of(UserSong userSong){
        return GetUserSongDto.builder()
                .basicSongId(userSong.getId())
                .songId(userSong.getSong().getId())
                .youtubeId(userSong.getSong().getYoutubeId())
                .title(userSong.getSong().getTitle())
                .artist(userSong.getSong().getArtist())
                .albumImg(userSong.getSong().getAlbumImg())
                .playTime(userSong.getSong().getPlayTime())
                .build();
    }
}
