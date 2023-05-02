package com.oreuda.oreuda_auth.api.controller;

import com.oreuda.oreuda_auth.api.service.RefreshService;
import com.oreuda.oreuda_auth.common.model.TokenKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(path="/api/v1/auth")
@Transactional
public class AuthController {

    @PostMapping(path="/refresh")
    public ResponseEntity<?> reissue(ServletRequest request, ServletResponse response) {
        log.info("Token Refreshed");
        String accessToken = ((HttpServletResponse) response).getHeader(TokenKey.ACCESS.getKey());
        String refreshToken = ((HttpServletResponse) response).getHeader(TokenKey.REFRESH.getKey());
        if (accessToken == null || refreshToken == null) {
            // 토큰 재발급 실패
            return ResponseEntity.badRequest().body("accessToken or refreshToken is null");
        }
        Map<String,String> tokens = RefreshService.refreshAccessToken(accessToken, refreshToken);
        // 토큰 재발급 성공시 body 에 토큰을 담아서 반환
        return ResponseEntity.ok().body(tokens);
    }
}
