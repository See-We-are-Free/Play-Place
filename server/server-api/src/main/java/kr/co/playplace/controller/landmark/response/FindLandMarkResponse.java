package kr.co.playplace.controller.landmark.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FindLandMarkResponse {
    private String title;
    private Double latitude;
    private Double longitude;
    private String representativeImg;

    @Builder
    public FindLandMarkResponse(String title, Double latitude, Double longitude, String representativeImg) {
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.representativeImg = representativeImg;
    }
}
