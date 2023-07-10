package mainproject.cafeIn.global.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import mainproject.cafeIn.domain.owner.entity.Owner;
import mainproject.cafeIn.global.auth.dto.LoginDto;
import mainproject.cafeIn.global.auth.jwt.JwtTokenizer;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { // 로그인 인증 정보 수신
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // LoginDto 클래스로 역직렬화

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken); // AuthenticationManager에게 인증 처리 위임
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        Owner owner = (Owner) authResult.getPrincipal();
//        Member member = (Member) authResult.getPrincipal();

//        if (owner.getOwnerId() == null) {
//            String accessToken = delegateMemberAccessToken(member);
//            String refreshToken = delegateMemberRefreshToken(member);
//        } else {
//            String accessToken = delegateOwnerAccessToken(owner);
//            String refreshToken = delegateOwnerRefreshToken(owner);
//        }

        String accessToken = delegateOwnerAccessToken(owner);
        String refreshToken = delegateOwnerRefreshToken(owner);

        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateOwnerAccessToken(Owner owner) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", owner.getOwnerId());
        claims.put("username", owner.getEmail());
        claims.put("roles", owner.getRoles());

        String subject = owner.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateOwnerRefreshToken(Owner owner) {
        String subject = owner.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
    // TODO delegateMemberAccessToken, delegateMemberRefreshToken 생성
}

