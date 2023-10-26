package kr.co.playplace.controller.user.requeset;

import kr.co.playplace.service.user.dto.JoinUserDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JoinUserRequest {

    String email;
    String nickname;
    int profileImg;

    @Builder
    public JoinUserRequest(String email, String nickname, int profileType) {
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileType;
    }

    public JoinUserDto toJoinUserDto() {
        return JoinUserDto.builder()
                .profileImg(this.profileImg)
                .email(this.email)
                .nickname(this.nickname)
                .build();
    }
}
