package com.oreuda.oreuda_auth.api.handler;

import com.oreuda.oreuda_auth.api.domain.dto.AuthDto;
import com.oreuda.oreuda_auth.api.client.UserClient;
import com.oreuda.oreuda_auth.api.domain.dto.UserDto;
import com.oreuda.oreuda_auth.api.domain.entity.Auth;
import com.oreuda.oreuda_auth.api.repository.UserRepository;
import com.oreuda.oreuda_auth.common.model.Token;
import com.oreuda.oreuda_auth.common.model.TokenKey;
import com.oreuda.oreuda_auth.api.provider.JwtCode;
import com.oreuda.oreuda_auth.api.provider.Role;
import com.oreuda.oreuda_auth.api.provider.TokenProvider;
import com.oreuda.oreuda_auth.api.repository.AuthRepository;
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
    private final UserRepository redisRepository;
    private final TokenProvider tokenProvider;
    private final UserClient userClient;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("로그인 성공");
        // 사용자 정보
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
//        log.info("attributes = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(attributes));
        AuthDto authDto = AuthDto.builder()
                .code(String.valueOf(attributes.get("id")))
                .registrationDate(LocalDateTime.now())
                .build();

        Token token;
        Auth guest = new Auth();
        Auth auth = authRepository.findByCode(authDto.getCode()).orElse(guest);
        // 첫 로그인 확인
        if (auth.equals(guest)) {
            // 회원가입
            authRepository.save(authDto.toAuth(authDto));
            auth = authRepository.findByCode(authDto.getCode()).orElseThrow();
            UserDto userDto = UserDto.builder()
                    .userId(String.valueOf(auth.getAuthId()))
                    .nickname(String.valueOf(attributes.get("nickname")))
                    .image(String.valueOf(attributes.get("image")))
                    .build();
            // 토큰 발급
            token = tokenProvider.generateToken(userDto.getUserId(), Role.USER.getKey());
            // DB에 저장
//            log.info("user = {}", new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userDto));
            saveGitHubTokenAndNodeId(String.valueOf(auth.getAuthId()), String.valueOf(attributes.get("nodeId")), String.valueOf(attributes.get("accessToken")));
            tokenProvider.setRefresh(
                    String.valueOf(auth.getAuthId()),
                    token.getRefreshToken(),
                    tokenProvider.getExpiration(TokenKey.REFRESH)
            );
            userClient.insertUser(userDto);
        } else {
            // 로그인
            UserDto userDto = UserDto.builder()
                    .userId(String.valueOf(auth.getAuthId()))
                    .nickname(String.valueOf(attributes.get("nickname")))
                    .image(String.valueOf(attributes.get("image")))
                    .build();
            // 토큰 발급
            String access = tokenProvider.generateAccess(userDto.getUserId(), Role.USER.getKey());
            String refresh = tokenProvider.getRefresh(String.valueOf(auth.getAuthId()));

            if (refresh != null && tokenProvider.validateToken(refresh) == JwtCode.ACCESS) {
                // refresh token 그대로 사용
                token = Token.builder().accessToken(access).refreshToken(refresh).build();
            } else {
                // refresh token 재발급
                token = tokenProvider.generateToken(userDto.getUserId(), Role.USER.getKey());
                tokenProvider.setRefresh(
                        String.valueOf(auth.getAuthId()),
                        token.getRefreshToken(),
                        tokenProvider.getExpiration(TokenKey.REFRESH)
                );
            }
            saveGitHubTokenAndNodeId(String.valueOf(auth.getAuthId()), String.valueOf(attributes.get("nodeId")), String.valueOf(attributes.get("accessToken")));
        }
        // 리다이렉트
        String redirectUrl = "http://localhost:3000/oauth2/success";
        String targetUrl = UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam(TokenKey.ACCESS.getKey(), "Bearer-" + token.getAccessToken())
                .queryParam(TokenKey.REFRESH.getKey(), "Bearer-" + token.getRefreshToken())
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    // GitHub access token, nodeId 저장
    public void saveGitHubTokenAndNodeId(String authId, String nodeId, String token) {
        redisRepository.set("accesstoken_" + authId, token);
        redisRepository.set("author_" + authId, nodeId);
    }
}
