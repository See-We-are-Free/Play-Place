package kr.co.playplace.controller.user;

import kr.co.playplace.common.ApiResponse;
import kr.co.playplace.common.exception.BaseException;
import kr.co.playplace.common.exception.ErrorCode;
import kr.co.playplace.common.security.dto.StatusResponseDto;
import kr.co.playplace.common.util.SecurityUtils;
import kr.co.playplace.controller.user.requeset.JoinUserRequest;
import kr.co.playplace.controller.user.requeset.UpdateUserRequest;
import kr.co.playplace.controller.user.response.FindLikeListResponse;
import kr.co.playplace.controller.user.response.FindUserInfoResponse;
import kr.co.playplace.service.song.SongService;
import kr.co.playplace.service.user.RefreshTokenService;
import kr.co.playplace.service.user.UserQueryService;
import kr.co.playplace.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    private final UserService userService;
    private final UserQueryService userQueryService;
    private final SongService songService;
    private final RefreshTokenService tokenService;

    @PostMapping
    public ApiResponse<Object> register(@RequestBody JoinUserRequest joinUserRequest, HttpServletResponse response) {

        if (userQueryService.findByEmail(joinUserRequest.getEmail()).isPresent())
            throw new BaseException(ErrorCode.ALREADY_EXIST_USER);

        String accessToken = userService.save(joinUserRequest.toJoinUserDto());

        response.setHeader("Authorization", accessToken);

        return ApiResponse.messageOk("Success");
    }

    @DeleteMapping("")
    public ResponseEntity<StatusResponseDto> deleteUsers(@RequestHeader(value = "Authorization") final String accessToken) {

        userService.deleteUsers(accessToken, SecurityUtils.getUser());
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(accessToken, SecurityUtils.getUser());

        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @GetMapping
    public ApiResponse<FindUserInfoResponse> getInfo() {
        return ApiResponse.ok(userQueryService.findUserInfoByEmail());
    }

    @PatchMapping("/push")
    public ApiResponse<Integer> changePushState() {
        return ApiResponse.ok(userService.changePushState());
    }

    @PatchMapping("/shake")
    public ApiResponse<Integer> changeShakeState() {
        return ApiResponse.ok(userService.changeShakeState());
    }

    @PatchMapping("")
    public ApiResponse<Integer> changeInfo(@RequestBody UpdateUserRequest updateUserRequest) {
        userService.changeInfo(updateUserRequest);
        return ApiResponse.messageOk("Success");
    }

    @GetMapping("/like")
    public ApiResponse<List<FindLikeListResponse>> getLikeList() {
        return ApiResponse.ok(songService.getLikeList());
    }


}
