package kr.co.playplace.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FindLandMarkDto {

    private String title;
    private double latitude;
    private double longitude;
    private String songImg;

    public FindLandMarkDto(String title, double latitude, double longitude, String songImg) {
        this.title = title;
        this.latitude = latitude;
        this.longitude = longitude;
        this.songImg = songImg;
    }
}
