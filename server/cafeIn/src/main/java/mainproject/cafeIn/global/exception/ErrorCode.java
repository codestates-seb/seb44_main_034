package mainproject.cafeIn.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 400
    REQUEST_VALIDATION_FAIL(HttpStatus.BAD_REQUEST, "잘못된 요청 값입니다."),
    NOT_AUTHOR(HttpStatus.BAD_REQUEST, "작성자가 아닙니다."),
    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    INVALID_ADDRESS(HttpStatus.BAD_REQUEST, "올바르지 않은 주소입니다."),

    // 401
    NONE_AUTHORIZATION_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),
    MEMBER_UNAUTHORIZED(HttpStatus.UNAUTHORIZED,"인증되지 않은 사용자입니다."),

    // 403

    // 404
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회원이 존재하지 않습니다."),
    CAFE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 카페가 존재하지 않습니다."),
    MENU_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 메뉴가 존재하지 않습니다."),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 게시글이 존재하지 않습니다."),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 댓글이 존재하지 않습니다."),

    // 409
    ALREADY_EXIST_EMAIL(HttpStatus.CONFLICT, "사용 중인 이메일입니다."),
    ALREADY_EXIST_NAME(HttpStatus.CONFLICT, "사용 중인 닉네임입니다."),

    // 500
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류입니다. 관리자에게 문의하세요.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
