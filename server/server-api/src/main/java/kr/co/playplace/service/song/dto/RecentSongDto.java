package kr.co.playplace.service.song.dto;

import kr.co.playplace.controller.song.request.SavePlaySongRequest;
import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.NowPlay;
import kr.co.playplace.entity.user.UserLandmarkSong;
import kr.co.playplace.entity.user.UserSong;
import kr.co.playplace.entity.user.Users;
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
@RedisHash(value = "recent_song", timeToLive = 3600)
public class RecentSongDto {

    @Id
    private Long userId;

    private Long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    private long playListSongId;
    private boolean isLandmark;

    public static RecentSongDto of(Long userId, Song song, SavePlaySongRequest savePlaySongRequest){
        return RecentSongDto.builder()
                .userId(userId)
                .songId(song.getId())
                .youtubeId(song.getYoutubeId())
                .title(song.getTitle())
                .artist(song.getArtist())
                .albumImg(song.getAlbumImg())
                .playTime(song.getPlayTime())
                .playListSongId(savePlaySongRequest.getPlaylistSongId())
                .isLandmark(savePlaySongRequest.isLandmark())
                .build();
    }

}
