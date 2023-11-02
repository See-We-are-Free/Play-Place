package kr.co.playplace.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /* 204 NO_CONTENT */
    NOT_FOUND_RECENT_SONG("PLAY04", HttpStatus.NO_CONTENT, "최근에 재생한 곡이 없습니다."),

    /* 400 BAD_REQUEST */
    INVALID_REFRESH_TOKEN("MEMBER03", HttpStatus.BAD_REQUEST, "유효한 토큰이 아닙니다."), // UserException
    INVALID_ADD_LANDMARK_PLAYLIST("LAND", HttpStatus.BAD_REQUEST, "더이상 재생목록에 공유재생목록을 추가 할 수 없습니다."),
    /* 401 UNAUTHORIZED */
    /* 403 FORBIDDEN */
    /* 404 NOT_FOUND */
    NOT_FOUND_LANDMARK_SONG("LAND02", HttpStatus.NOT_FOUND, "랜드마크에 곡이 없습니다."),
    NOT_FOUND_AREA_SONG("HOME03", HttpStatus.NOT_FOUND, "해당하는 지역에서 재생된 곡이 없습니다."),
    NOT_FOUND_WEATHER_SONG("HOME03", HttpStatus.NOT_FOUND, "해당하는 날씨에 재생된 곡이 없습니다."),
    NOT_FOUND_TIME_SONG("HOME03", HttpStatus.NOT_FOUND, "해당하는 시간대에 재생된 곡이 없습니다."),
    NOT_FOUND_USER("MY01", HttpStatus.NOT_FOUND, "해당하는 사용자가 없습니다."),
    NOT_FOUND_LANDMARK("LAND", HttpStatus.NOT_FOUND, "해당하는 랜드마크가 없습니다."),

    /* 409 CONFLICT */
    ALREADY_EXIST_USER("MEMBER01", HttpStatus.CONFLICT, "이미 회원가입 되었습니다."),
    ALREADY_ADD_SONG("LAND03", HttpStatus.CONFLICT, "이미 추가하셨습니다."),
    ALREADY_EXIST_SONG("LAND3", HttpStatus.CONFLICT, "이미 존재하는 곡입니다");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}
