package com.oreuda.oreuda_auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.oreuda_auth.domain.dto.AuthDto;
import com.oreuda.oreuda_auth.domain.dto.UserDto;
import com.oreuda.oreuda_auth.domain.entity.Auth;
import com.oreuda.oreuda_auth.model.Token;
import com.oreuda.oreuda_auth.model.TokenKey;
import com.oreuda.oreuda_auth.provider.JwtCode;
import com.oreuda.oreuda_auth.provider.Role;
import com.oreuda.oreuda_auth.provider.TokenProvider;
import com.oreuda.oreuda_auth.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final AuthRepository authRepository;
    private final TokenProvider tokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("로그인 성공");
        // 인가코드
//        String code = request.getParameter("code");

        // 사용자 정보
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        log.info("attributes = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(attributes));
        AuthDto authDto = AuthDto.builder()
                .code(String.valueOf(attributes.get("id")))
                .accessToken(String.valueOf(attributes.get("accessToken")))
                .registrationDate(LocalDateTime.now())
                .build();

        UserDto userDto;
        Auth guest = new Auth();
        Token token;

        Auth auth = authRepository.findByCode(authDto.getCode()).orElse(guest);

        if (auth.equals(guest)) {
            // 회원가입
            authRepository.save(authDto.toAuth(authDto));
            auth = authRepository.findByCode(authDto.getCode()).orElseThrow();
            userDto = new UserDto(String.valueOf(auth.getAuthId()), String.valueOf(attributes.get("image")), String.valueOf(attributes.get("nickname")));
            // 토큰 발급
            token = tokenProvider.generateToken(userDto.getUserId(), Role.USER.getKey());
            tokenProvider.setRefresh(
                    String.valueOf(auth.getAuthId()),
                    token.getRefreshToken(),
                    tokenProvider.getExpiration(TokenKey.REFRESH)
            );
            // DB에 저장
            // userClient.insertuser(userDto);
            log.info("user = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userDto));
        } else {
            // 로그인
            userDto = new UserDto(String.valueOf(auth.getAuthId()), String.valueOf(attributes.get("image")), String.valueOf(attributes.get("nickname")));
            // 토큰 발급
            String access = tokenProvider.generateAccess(userDto.getUserId(), Role.USER.getKey());
            String refresh = tokenProvider.getRefresh(String.valueOf(auth.getAuthId()));

            if (refresh != null && tokenProvider.validateToken(refresh) == JwtCode.ACCESS) {
                // refresh token 그대로 사용
                token = Token.builder().accessToken(access).refreshToken(refresh).build();
            } else {
                // refresh token 재발급
                token = tokenProvider.generateToken(userDto.getUserId(), Role.USER.getKey());
            }
        }

        String redirectUrl = "http://localhost:8090/oauth2/success";
        String targetUrl = UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam(TokenKey.ACCESS.getKey(), "Bearer-" + token.getAccessToken())
                .queryParam(TokenKey.REFRESH.getKey(), "Bearer-" + token.getRefreshToken())
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
