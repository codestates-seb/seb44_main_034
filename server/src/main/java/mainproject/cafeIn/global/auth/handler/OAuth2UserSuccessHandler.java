package mainproject.cafeIn.global.auth.handler;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.entity.Member;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.member.service.MemberService;
import mainproject.cafeIn.global.auth.jwt.JwtTokenizer;
import mainproject.cafeIn.global.auth.utils.CustomAuthorityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String displayName = String.valueOf(oAuth2User.getAttributes().get("name"));
        String image = String.valueOf(oAuth2User.getAttributes().get("picture"));
        List<String> authorities = authorityUtils.createRoles(request.getRequestURI());

        if (memberRepository.findByEmail(email).isPresent()) {
            Member member = memberService.findByEmail(email);
            redirect(request, response, member);
        } else {
            Member member = saveMember(email, image, displayName, authorities, request.getRequestURI());
            redirect(request, response, member);
        }

    }

    private Member saveMember(String email, String image, String displayName, List<String> authorities, String uri) {
        Member member = Member.builder()
                .displayName(displayName)
                .email(email)
                .image(image)
                .roles(authorities)
                .password("dd")
                .build();

        return memberService.signUp(member, uri);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException {
        String accessToken = delegateAccessToken(member.getId(), member.getEmail(), member.getRoles());
        String refreshToken = delegateRefreshToken(member.getEmail());
        response.setHeader("Role", "member");

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(long userId, String email, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("username", email);
        claims.put("roles", authorities);

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(5173)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}
