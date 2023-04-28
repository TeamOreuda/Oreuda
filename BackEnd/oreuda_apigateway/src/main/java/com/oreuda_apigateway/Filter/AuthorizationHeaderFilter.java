package com.oreuda_apigateway.Filter;

import io.jsonwebtoken.ExpiredJwtException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

import com.oreuda_apigateway.config.security.JwtUtil;

@Slf4j
@Component
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    @Autowired
    private JwtUtil jwtUtil;

    public AuthorizationHeaderFilter() {
        super(Config.class);
    }

    public static class Config {
        // application.yml 파일에서 지정한 filter의 Argument값을 받는 부분
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest().getHeaders().get("Authorization").get(0).substring(7);   // 헤더의 토큰 파싱 (Bearer 제거)

            String userId = jwtUtil.getUid(token);

            addAuthorizationHeaders(exchange.getRequest(), userId);
            return chain.filter(exchange);
        };
    }

    // 성공적으로 검증이 되었기 때문에 인증된 헤더로 요청을 변경해준다. 서비스는 해당 헤더에서 아이디를 가져와 사용한다.
    private void addAuthorizationHeaders(ServerHttpRequest request, String userId) {
        request.mutate()
                .header("userId", userId)
                .build();
    }

    // 토큰 검증 요청을 실행하는 도중 예외가 발생했을 때 예외처리하는 핸들러
    @Bean
    public ErrorWebExceptionHandler tokenValidation() {
        return new JwtTokenExceptionHandler();
    }

    // 실제 토큰이 null, 만료 등 예외 상황에 따른 예외처리
    public class JwtTokenExceptionHandler implements ErrorWebExceptionHandler {
        private String getErrorCode(int errorCode) {

            log.info(""+errorCode);
            return "{\"errorCode\":" + errorCode + "}";
        }

        @Override
        public Mono<Void> handle(
                ServerWebExchange exchange, Throwable ex) {

            int errorCode = 500;
            if (ex.getClass() == NullPointerException.class) {
                errorCode = 100;
            } else if (ex.getClass() == ExpiredJwtException.class) {
                errorCode = 200;
            }

            byte[] bytes = getErrorCode(errorCode).getBytes(StandardCharsets.UTF_8);
            DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);

             // 토큰 값 null 일 시에 401 or 만료 시에 403 에러 발생
             if (errorCode == 100) {
                 exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                 return exchange.getResponse().writeWith(Flux.just(buffer));
             }
             else if (errorCode == 200) {
                 exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                 return exchange.getResponse().writeWith(Flux.just(buffer));
             }
             else {
                 exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                 return exchange.getResponse().writeWith(Flux.just(buffer));
             }
        }
    }
}