package kr.co.playplace.common.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import lombok.*;

@NoArgsConstructor
@Getter
@ToString
@AllArgsConstructor
@Builder
public class SecurityUserDto {
    private String email;
    private String nickname;
    private String profileImg;
    private String role;
    private Long userId;

}