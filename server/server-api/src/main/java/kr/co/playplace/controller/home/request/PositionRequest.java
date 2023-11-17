package kr.co.playplace.controller.home.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class PositionRequest {
    private double lon;
    private double lat;
}
