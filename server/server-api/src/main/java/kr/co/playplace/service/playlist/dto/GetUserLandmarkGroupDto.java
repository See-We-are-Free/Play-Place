package kr.co.playplace.service.playlist.dto;

import kr.co.playplace.entity.user.UserLandmarkGroup;
import kr.co.playplace.entity.user.UserLandmarkSong;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GetUserLandmarkGroupDto {

    private long landmarkId;
    private long userLandmarkGroupId;
    private String title;
    private int landmarkSongsCnt;
    private List<GetUserLandmarkSongDto> landmarkSongs;

    public static GetUserLandmarkGroupDto of(UserLandmarkGroup userLandmarkGroup, List<GetUserLandmarkSongDto> landmarkSongs){
        return GetUserLandmarkGroupDto.builder()
                .landmarkId(userLandmarkGroup.getLandmark().getId())
                .userLandmarkGroupId(userLandmarkGroup.getId())
                .title(userLandmarkGroup.getLandmark().getTitle())
                .landmarkSongsCnt(landmarkSongs.size())
                .landmarkSongs(landmarkSongs)
                .build();
    }
}
