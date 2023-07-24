package mainproject.cafeIn.global.auth.handler;

import lombok.extern.slf4j.Slf4j;
import mainproject.cafeIn.global.auth.utils.ErrorResponder;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class UserAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ErrorResponder.sendDeniedErrorResponse(response);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
