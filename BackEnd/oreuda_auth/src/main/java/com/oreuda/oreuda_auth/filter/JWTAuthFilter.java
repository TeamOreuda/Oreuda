package com.oreuda.oreuda_auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.oreuda_auth.domain.dto.AuthDto;
import com.oreuda.oreuda_auth.model.Token;
import com.oreuda.oreuda_auth.model.TokenKey;
import com.oreuda.oreuda_auth.provider.JwtCode;
import com.oreuda.oreuda_auth.provider.Role;
import com.oreuda.oreuda_auth.provider.TokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JWTAuthFilter extends GenericFilterBean {

    private final TokenProvider tokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 헤더의 JWT 토큰
        String token = tokenProvider.resolveToken(((HttpServletRequest) request).getHeader(TokenKey.ACCESS.getKey()));
        // 토큰 유효성 검사
        if (token != null && tokenProvider.validateToken(token) == JwtCode.ACCESS) {
            // access 토큰이 유효한 경우
            // 사용자 인증 정보
            String authId = tokenProvider.getUid(token);
            AuthDto authDto = AuthDto.builder()
                    .authId(authId)
                    .build();
            // Authentication 객체 생성 후 SecurityContext 에 저장
            Authentication auth = getAuthentication(authDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
            log.info("name = {}, uri = {}", auth.getName(), ((HttpServletRequest) request).getRequestURI());
        } else if (token != null && tokenProvider.validateToken(token) == JwtCode.EXPIRED) {
            // access 토큰이 만료된 경우
            // claims 에서 authId 추출
            Claims claims = tokenProvider.getClaims(token);
            AuthDto authDto = AuthDto.builder()
                    .authId(claims.getSubject())
                    .build();
            // refresh 토큰 검사
            String refresh = tokenProvider.resolveToken(((HttpServletRequest) request).getHeader(TokenKey.REFRESH.getKey()));
            String savedRefresh = tokenProvider.getRefresh(authDto.getAuthId());
            if (refresh.equals(savedRefresh) && tokenProvider.validateToken(refresh) == JwtCode.ACCESS) {
                // refresh 토큰이 유효하고, 저장된 refresh 토큰과 일치하는 경우
                Token tokens = tokenProvider.generateToken(authDto.getAuthId(), Role.USER.getKey());

                tokenProvider.setRefresh(authDto.getAuthId(),
                        tokens.getRefreshToken(), tokenProvider.getExpiration(TokenKey.REFRESH));
                // 헤더에 토큰 저장
                ((HttpServletResponse) response).setHeader(TokenKey.ACCESS.getKey(),
                        "Bearer-" + tokens.getAccessToken());
                ((HttpServletResponse) response).setHeader(TokenKey.REFRESH.getKey(),
                        "Bearer-" + tokens.getRefreshToken());
                // Authentication 객체 생성 후 SecurityContext 에 저장
                Authentication auth = getAuthentication(authDto);
                SecurityContextHolder.getContext().setAuthentication(auth);
                log.info("name = {}, uri = {}", auth.getName(), ((HttpServletRequest) request).getRequestURI());
        }
        } else {
            log.info("token is not valid");
        }
        chain.doFilter(request, response);
    }

    // 인증 정보로 Authentication 객체 생성
    public Authentication getAuthentication(AuthDto authDto) {
        return new UsernamePasswordAuthenticationToken(authDto, "", List.of(new SimpleGrantedAuthority(Role.USER.getKey())));
    }
}
