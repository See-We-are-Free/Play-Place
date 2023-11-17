package kr.co.playplace.controller.song.response;

import kr.co.playplace.entity.song.Song;
import kr.co.playplace.entity.user.NowPlay;
import kr.co.playplace.service.song.dto.RecentSongDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetRecentSongResponse {


    private long songId;
    private String youtubeId;
    private String title;
    private String artist;
    private String albumImg;
    private long playTime;

    private long playListSongId;
    private boolean isLandmark;

    private boolean like;

    public static GetRecentSongResponse of(RecentSongDto recentSongDto, boolean like){
        return GetRecentSongResponse.builder()
                .songId(recentSongDto.getSongId())
                .youtubeId(recentSongDto.getYoutubeId())
                .title(recentSongDto.getTitle())
                .artist(recentSongDto.getArtist())
                .albumImg(recentSongDto.getAlbumImg())
                .playTime(recentSongDto.getPlayTime())
                .playListSongId(recentSongDto.getPlayListSongId())
                .isLandmark(recentSongDto.isLandmark())
                .like(like)
                .build();
    }

    public static GetRecentSongResponse of(NowPlay nowPlay, boolean like){
        if(nowPlay.getUserLandmarkSong() != null){
            return GetRecentSongResponse.builder()
                    .songId(nowPlay.getUserLandmarkSong().getSong().getId())
                    .youtubeId(nowPlay.getUserLandmarkSong().getSong().getYoutubeId())
                    .title(nowPlay.getUserLandmarkSong().getSong().getTitle())
                    .artist(nowPlay.getUserLandmarkSong().getSong().getArtist())
                    .albumImg(nowPlay.getUserLandmarkSong().getSong().getAlbumImg())
                    .playTime(nowPlay.getUserLandmarkSong().getSong().getPlayTime())
                    .playListSongId(nowPlay.getUserLandmarkSong().getId())
                    .isLandmark(true)
                    .like(like)
                    .build();
        }else{
            return GetRecentSongResponse.builder()
                    .songId(nowPlay.getUserSong().getSong().getId())
                    .youtubeId(nowPlay.getUserSong().getSong().getYoutubeId())
                    .title(nowPlay.getUserSong().getSong().getTitle())
                    .artist(nowPlay.getUserSong().getSong().getArtist())
                    .albumImg(nowPlay.getUserSong().getSong().getAlbumImg())
                    .playTime(nowPlay.getUserSong().getSong().getPlayTime())
                    .playListSongId(nowPlay.getUserSong().getId())
                    .isLandmark(true)
                    .like(like)
                    .build();
        }
    }
}
