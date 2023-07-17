package mainproject.cafeIn.global.auth.utils;

import com.google.gson.Gson;
import mainproject.cafeIn.global.exception.ErrorCode;
import mainproject.cafeIn.global.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendAuthorizedErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorCode(ErrorCode.MEMBER_UNAUTHORIZED)
                .message(ErrorCode.MEMBER_UNAUTHORIZED.getMessage())
                .build();

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
    public static void sendDeniedErrorResponse(HttpServletResponse response) throws IOException {
        Gson gson = new Gson();

        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorCode(ErrorCode.NONE_AUTHORIZATION_TOKEN)
                .message(ErrorCode.NONE_AUTHORIZATION_TOKEN.getMessage())
                .build();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
