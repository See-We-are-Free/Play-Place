package kr.co.playplace.controller.landmark.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class SearchLandmarkResponse {

    private long landmarkId;
    private String landmarkName;
    private String villageName;

}
