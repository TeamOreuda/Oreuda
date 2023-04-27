package com.oreuda.oreuda_auth.controller;

import com.oreuda.oreuda_auth.domain.dto.AuthDto;
import com.oreuda.oreuda_auth.filter.JWTAuthFilter;
import com.oreuda.oreuda_auth.model.TokenKey;
import com.oreuda.oreuda_auth.provider.JwtCode;
import com.oreuda.oreuda_auth.provider.TokenProvider;
import com.oreuda.oreuda_auth.service.RefreshService;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
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
        log.info("refreshAccessToken");
        String accessToken = ((HttpServletResponse) response).getHeader(TokenKey.ACCESS.getKey());
        String refreshToken = ((HttpServletResponse) response).getHeader(TokenKey.REFRESH.getKey());
        if (accessToken == null || refreshToken == null) {
            return ResponseEntity.badRequest().body("accessToken or refreshToken is null");
        }
        Map<String,String> tokens = RefreshService.refreshAccessToken(accessToken, refreshToken);
        return ResponseEntity.ok().body(tokens);
    }
}
