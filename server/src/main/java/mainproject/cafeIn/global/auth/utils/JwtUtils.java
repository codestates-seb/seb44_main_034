package mainproject.cafeIn.global.auth.utils;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.global.auth.jwt.JwtTokenizer;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final JwtTokenizer jwtTokenizer;

    public Map<String, Object> getJwsClaims(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }
}
