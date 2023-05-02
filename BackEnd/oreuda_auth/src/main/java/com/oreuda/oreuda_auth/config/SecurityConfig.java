package com.oreuda.oreuda_auth.config;

import com.oreuda.oreuda_auth.common.filter.JWTAuthFilter;
import com.oreuda.oreuda_auth.api.handler.OAuth2AuthenticationFailureHandler;
import com.oreuda.oreuda_auth.api.handler.OAuth2AuthenticationSuccessHandler;
import com.oreuda.oreuda_auth.api.provider.TokenProvider;
import com.oreuda.oreuda_auth.api.service.CustomOAuth2AuthService;
import com.oreuda.oreuda_auth.api.service.CustomOidcUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

    private final CustomOAuth2AuthService customOAuth2AuthService;
    private final CustomOidcUserService customOidcUserService;
    private final TokenProvider tokenProvider;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http    
                // http basic 인증 방식 비활성아
                // rest -> csrf, 폼로그인, 세션 비활성화
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // 요청에 대한 인가 설정
                .authorizeRequests()
                // 토큰 발급 요청, 메인페이지는 인증 없이 접근 가능
                .antMatchers("/", "/oauth2/**").permitAll()
                .anyRequest().authenticated()
                .and()
                // 로그아웃 설정
                .logout()
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                // 사용자 정보를 가져오는 서비스
                .oidcUserService(customOidcUserService)
                .userService(customOAuth2AuthService)
                .and()
                // 로그인 성공 후 실행할 핸들러
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler);
        http.addFilterBefore(new JWTAuthFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
