package com.oreuda.oreuda_auth.oauth2.handler;

import com.oreuda.oreuda_auth.oauth2.Provider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private String redirectUrl = "https://localhost:8080";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("로그인 성공");
//        String[] path = request.getRequestURI().split("/");
//        Provider provider = Provider.valueOf(path[path.length - 1].toUpperCase());
//        String oauthId = authentication.getName();
//        String uri = UriComponentsBuilder.fromUriString("/oauth2/success")
//                .queryParam("provider", provider)
//                .queryParam("oauthId", oauthId)
//                .build().toUriString();
//        response.sendRedirect(uri);

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();

    }
}
