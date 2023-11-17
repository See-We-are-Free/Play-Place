package kr.co.playplace.controller.user.requeset;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateUserRequest {

    String nickname;
    Integer profileImg;

}
