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
    private boolean isPush;
    private boolean isShake;

    @Builder
    public FindUserInfoResponse(String nickname, int profileImg, String email, int isPush, int isShake) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.email = email;
        this.isPush = isPush == 0? false : true;
        this.isShake = isShake == 0? false : true;
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
