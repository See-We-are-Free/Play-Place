package kr.co.playplace.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* UserException */
    INVALID_REFRESH_TOKEN("MEMBER03", HttpStatus.BAD_REQUEST, "유효한 토큰이 아닙니다.");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}
