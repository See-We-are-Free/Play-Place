package kr.co.playplace.controller.landmark.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FindLandmarkResponse {
    private Long landmarkId;
    private String title;
    private Double latitude;
    private Double longitude;
    private String representativeImg;

    @Builder
    public FindLandmarkResponse(Long landmarkId, String title, Double latitude, Double longitude, String representativeImg) {
        this.landmarkId = landmarkId;
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.representativeImg = representativeImg;
    }
}
