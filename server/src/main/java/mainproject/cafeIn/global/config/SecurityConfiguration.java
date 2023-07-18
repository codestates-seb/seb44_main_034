package mainproject.cafeIn.global.config;

import lombok.RequiredArgsConstructor;
import mainproject.cafeIn.domain.member.repository.MemberRepository;
import mainproject.cafeIn.domain.member.service.MemberService;
import mainproject.cafeIn.global.auth.filter.JwtAuthenticationFilter;
import mainproject.cafeIn.global.auth.filter.JwtVerificationFilter;
import mainproject.cafeIn.global.auth.handler.*;
import mainproject.cafeIn.global.auth.interceptor.JwtParseInterceptor;
import mainproject.cafeIn.global.auth.jwt.JwtTokenizer;
import mainproject.cafeIn.global.auth.utils.CustomAuthorityUtils;
import mainproject.cafeIn.global.auth.utils.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtUtils jwtUtils;
    private final MemberRepository memberRepository;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, MemberService memberService) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // 동일 출처 request만 허용
                .and()
                .csrf().disable() // CSRF 공격 비활성화
                .cors().configurationSource(corsConfigurationSource())
                .and()// CORS 설정
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable() // 폼 로그인 방식(SSR에서 주로 사용)
                .httpBasic().disable() // request 전송 때마다 username/password 정보를 header에 실어서 인증
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers(HttpMethod.POST, "/*/members/{member-id}/follow").hasRole("USER")
//                        .antMatchers(HttpMethod.POST, "/*/members").permitAll()
//                        .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/*/members/my-page/**").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE, "/*/members").permitAll()
//                        .antMatchers(HttpMethod.POST, "/*/owners/**").permitAll()
//                        .antMatchers("/*/owners/**").hasRole("OWNER")
//                        .antMatchers(HttpMethod.POST,"/*/cafes/{cafe-id}/bookmark").hasRole("USER")
//                        .antMatchers(HttpMethod.POST,  "/*/cafes").hasRole("OWNER")
//                        .antMatchers(HttpMethod.PATCH, "/*/cafes").hasRole("OWNER")
//                        .antMatchers(HttpMethod.DELETE, "/*/cafes").hasRole("OWNER")
//                        .antMatchers(HttpMethod.GET,"/*/cafes/**").permitAll()
//                        .antMatchers(HttpMethod.GET, "/*/menus/**").permitAll()
//                        .antMatchers("/*/menus/**").hasRole("OWNER")
//                        .anyRequest().hasRole("USER"));
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2UserSuccessHandler(jwtTokenizer, authorityUtils, memberRepository, memberService))
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() { // 패스워드 암호화
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://cafein.site", "https://fe-cafein.s3.ap-northeast-2.amazonaws.com")); // 모든 출처 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE")); // HTTP Method 허용
        configuration.setAllowedHeaders(Arrays.asList("*")); // header에 모두 요청 가능
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh", "Role")); // 헤더 노출 허용
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 URL에 CORS 정책 적용

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/users/log-in"); // 이 경로로 요청이 들어와야 함
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtUtils, authorityUtils);

            builder
                    .addFilterAfter(jwtAuthenticationFilter, OAuth2LoginAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JwtParseInterceptor(jwtUtils))
                .addPathPatterns("/**");
    }
}
