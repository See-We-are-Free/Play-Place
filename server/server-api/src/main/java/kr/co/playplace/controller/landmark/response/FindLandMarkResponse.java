package kr.co.playplace.controller.landmark.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FindLandMarkResponse {
    private String title;
    private Double latitude;
    private Double langitude;
    private String representativeImg;

    @Builder
    public FindLandMarkResponse(String title, Double latitude, Double langitude, String representativeImg) {
        this.title = title;
        this.latitude = latitude;
        this.langitude = langitude;
        this.representativeImg = representativeImg;
    }
}
