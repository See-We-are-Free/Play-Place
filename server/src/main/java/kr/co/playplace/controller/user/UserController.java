package kr.co.playplace.controller.user;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/users")
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping
    public ApiResponse<Object> register(@RequestParam(name="email") String email, @RequestParam(name="provider") String provider){
        userService.save(email);

        return ApiResponse.messageOk("Success");
    }


}
