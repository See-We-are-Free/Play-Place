package kr.co.playplace.service.landmark.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FindLandmarkSongDto {

    private Long userId;
    private Long songId;

    @Builder
    public FindLandmarkSongDto(Long userId, Long songId) {
        this.userId = userId;
        this.songId = songId;
    }
}
