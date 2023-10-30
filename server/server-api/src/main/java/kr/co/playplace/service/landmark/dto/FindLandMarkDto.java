package kr.co.playplace.service.landmark.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FindLandMarkDto {

    private String title;
    private Double latitude;
    private Double longitude;
    private String representativeImg;

    @Builder
    public FindLandMarkDto(String title, Double latitude, Double longitude, String representativeImg) {
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.representativeImg = representativeImg;
    }
}
