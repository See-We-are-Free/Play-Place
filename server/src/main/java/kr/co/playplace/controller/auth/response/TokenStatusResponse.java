package kr.co.playplace.controller.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TokenStatusResponse {

    private Integer status;
    private String accessToken;

    public static TokenStatusResponse addStatus(Integer status, String accessToken) {
        return new TokenStatusResponse(status, accessToken);
    }
}