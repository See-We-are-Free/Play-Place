package kr.co.playplace.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    String code;
    ErrorCode errorCode;
    String message;
}
