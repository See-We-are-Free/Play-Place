package kr.co.playplace.controller.user.response;

import kr.co.playplace.entity.user.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
public class FindUserInfoResponse {

    private String nickname;
    private int profileImg;
    private String email;
    private int isPush;
    private int isShake;

    @Builder
    public FindUserInfoResponse(Long id, String nickname, int profileImg, String email, int isPush, int isShake) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.email = email;
        this.isPush = isPush;
        this.isShake = isShake;
    }

    public static FindUserInfoResponse of(Users user) {
        return FindUserInfoResponse.builder()
                .nickname(user.getNickname())
                .email(user.getOuthId())
                .profileImg(user.getProfileImg())
                .isPush(user.getIsPush())
                .isShake(user.getIsShake())
                .build();
    }
}
