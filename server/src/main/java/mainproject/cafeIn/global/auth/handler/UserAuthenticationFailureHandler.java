package mainproject.cafeIn.global.auth.handler;

import lombok.extern.slf4j.Slf4j;
import mainproject.cafeIn.global.auth.utils.ErrorResponder;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.error("# Authentication failed: {}", exception.getMessage());

        ErrorResponder.sendAuthorizedErrorResponse(response, HttpStatus.NOT_FOUND);
    }
}
