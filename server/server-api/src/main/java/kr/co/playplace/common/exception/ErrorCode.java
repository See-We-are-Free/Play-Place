package kr.co.playplace.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 400 BAD_REQUEST */
    INVALID_REFRESH_TOKEN("MEMBER03", HttpStatus.BAD_REQUEST, "유효한 토큰이 아닙니다."), // UserException

    /* 401 UNAUTHORIZED */
    /* 403 FORBIDDEN */
    /* 404 NOT_FOUND */
    NOT_FOUND_RECENT_SONG("PLAY04", HttpStatus.NOT_FOUND, "최근에 재생한 곡이 없습니다."),
    NOT_FOUND_LANDMARK_SONG("LAND02", HttpStatus.NOT_FOUND, "랜드마크에 곡이 없습니다."),

    /* 409 CONFLICT */
    ALREADY_EXIST_USER("MEMBER01", HttpStatus.CONFLICT, "이미 회원가입 되었습니다.");
    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}
