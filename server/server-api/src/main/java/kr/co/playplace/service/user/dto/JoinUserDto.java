package kr.co.playplace.service.user.dto;

import kr.co.playplace.entity.user.Users;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class JoinUserDto {
    String email;
    String nickname;
    int profileImg;
    String googleToken;

    @Builder
    public JoinUserDto(String email, String nickname, int profileImg, String googleToken) {
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.googleToken = googleToken;
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
