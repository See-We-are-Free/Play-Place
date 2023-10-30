package kr.co.playplace.controller.landmark.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FindLandMarkResponse {
    private Long landMarkId;
    private String title;
    private Double latitude;
    private Double longitude;
    private String representativeImg;

    @Builder
    public FindLandMarkResponse(Long landMarkId, String title, Double latitude, Double longitude, String representativeImg) {
        this.landMarkId = landMarkId;
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.representativeImg = representativeImg;
    }
}
