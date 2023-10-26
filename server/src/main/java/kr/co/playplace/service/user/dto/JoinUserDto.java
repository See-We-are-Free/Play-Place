package kr.co.playplace.service.user.dto;

import kr.co.playplace.entity.user.Users;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JoinUserDto {
    String email;
    String nickname;
    int profileImg;

    @Builder
    public JoinUserDto(String email, String nickname, int profileImg) {
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

    public Users toEntity() {
        return Users.builder()
                .outhId(this.email)
                .role("ROLE_USER")
                .nickname(this.nickname)
                .profileImg(this.profileImg)
                .build();
    }
}
