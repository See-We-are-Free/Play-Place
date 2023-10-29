package kr.co.playplace.controller.radar.request;

import lombok.Data;

@Data
public class UserLocationRequest {
    long userId;
    double latitude;
    double longitude;
}
