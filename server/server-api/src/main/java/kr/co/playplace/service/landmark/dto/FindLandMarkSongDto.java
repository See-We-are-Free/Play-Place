package kr.co.playplace.service.landmark.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FindLandMarkSongDto {

    private Long userId;
    private Long songId;

    @Builder
    public FindLandMarkSongDto(Long userId, Long songId) {
        this.userId = userId;
        this.songId = songId;
    }
}
