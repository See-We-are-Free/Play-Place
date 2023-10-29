package kr.co.playplace.controller.user;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.controller.user.requeset.JoinUserRequest;
import kr.co.playplace.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping
    public ApiResponse<Object> register(@RequestBody JoinUserRequest joinUserRequest, HttpServletResponse response) {

        String accessToken = userService.save(joinUserRequest.toJoinUserDto());

        response.setHeader("Authorization", accessToken);

        return ApiResponse.messageOk("Success");
    }


}
