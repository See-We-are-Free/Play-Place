package kr.co.playplace.controller.user;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.controller.user.requeset.JoinUserRequest;
import kr.co.playplace.controller.user.response.FindUserInfoResponse;
import kr.co.playplace.service.user.UserQueryService;
import kr.co.playplace.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    private final UserService userService;
    private final UserQueryService userQueryService;

    @PostMapping
    public ApiResponse<Object> register(@RequestBody JoinUserRequest joinUserRequest, HttpServletResponse response) {

        if (userQueryService.findByEmail(joinUserRequest.getEmail()).isPresent())
            throw new BaseException(ErrorCode.ALREADY_EXIST_USER);

        String accessToken = userService.save(joinUserRequest.toJoinUserDto());

        response.setHeader("Authorization", accessToken);

        return ApiResponse.messageOk("Success");
    }

    @GetMapping
    public ApiResponse<FindUserInfoResponse> getInfo() {
        return ApiResponse.ok(userQueryService.findUserInfoByEmail());
    }


}
