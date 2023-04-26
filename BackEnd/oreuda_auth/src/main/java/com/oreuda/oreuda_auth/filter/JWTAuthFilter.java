package com.oreuda.oreuda_auth.filter;

import com.oreuda.oreuda_auth.domain.dto.AuthDto;
import com.oreuda.oreuda_auth.model.Token;
import com.oreuda.oreuda_auth.model.TokenKey;
import com.oreuda.oreuda_auth.provider.JwtCode;
import com.oreuda.oreuda_auth.provider.Role;
import com.oreuda.oreuda_auth.provider.TokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JWTAuthFilter extends GenericFilterBean {

    private final TokenProvider tokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = tokenProvider.resolveToken(((HttpServletRequest) request).getHeader(TokenKey.ACCESS.getKey()));
        if (token != null && tokenProvider.validateToken(token) == JwtCode.ACCESS) {
            String authId = tokenProvider.getUid(token);
            AuthDto authDto = AuthDto.builder()
                    .authId(authId)
                    .build();

            Authentication auth = getAuthentication(authDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
            log.info("name = {}, uri = {}", auth.getName(), ((HttpServletRequest) request).getRequestURI());
        } else if (token != null && tokenProvider.validateToken(token) == JwtCode.EXPIRED) {
            Claims claims = tokenProvider.getClaims(token);
            AuthDto authDto = AuthDto.builder()
                    .authId(claims.getSubject())
                    .build();

            String refresh = tokenProvider.resolveToken(((HttpServletRequest) request).getHeader(TokenKey.REFRESH.getKey()));

            String savedRefresh = tokenProvider.getRefresh(authDto.getAuthId());

            if (refresh.equals(savedRefresh) && tokenProvider.validateToken(refresh) == JwtCode.ACCESS) {
                Token tokens = tokenProvider.generateToken(authDto.getAuthId(), Role.USER.getKey());

                tokenProvider.setRefresh(authDto.getAuthId(),
                        tokens.getRefreshToken(), tokenProvider.getExpiration(TokenKey.REFRESH));

                ((HttpServletResponse)response).setHeader(TokenKey.ACCESS.getKey(),
                    "Bearer " + tokens.getAccessToken());
                ((HttpServletResponse)response).setHeader(TokenKey.REFRESH.getKey(),
                        "Bearer " + tokens.getRefreshToken());

                Authentication auth = getAuthentication(authDto);
                SecurityContextHolder.getContext().setAuthentication(auth);
                log.info("name = {}, uri = {}", auth.getName(), ((HttpServletRequest) request).getRequestURI());
            }
        } else {
            log.info("no valid token");
        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(AuthDto authDto) {
        return new UsernamePasswordAuthenticationToken(authDto, "", List.of(new SimpleGrantedAuthority(Role.USER.getKey())));
    }
}
