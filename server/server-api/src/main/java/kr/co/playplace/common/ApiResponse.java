package kr.co.playplace.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.OK;

@Getter
public class ApiResponse<T> {

    private int code;
    private HttpStatus status;
    private String message;
    private T data;

    public ApiResponse(HttpStatus status, String message, T data) {
        this.code = status.value();
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> of(HttpStatus status, String message, T data) {
        return new ApiResponse<>(status, message, data);
    }

    public static <T> ApiResponse<T> ok(T data) {
        return of(OK, "SUCCESS", data);
    }

    public static <T> ApiResponse<T> messageDataOk(String message, T date) {
        return of(OK, message, date);
    }

    public static <T> ApiResponse<T> messageOk(String message) {
        return of(OK, message, null);
    }
}
