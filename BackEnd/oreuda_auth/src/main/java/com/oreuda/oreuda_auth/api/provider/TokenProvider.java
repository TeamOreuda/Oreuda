package com.oreuda.oreuda_auth.api.provider;

import com.oreuda.oreuda_auth.api.repository.RedisRepository;
import com.oreuda.oreuda_auth.common.model.Token;
import com.oreuda.oreuda_auth.common.model.TokenKey;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class TokenProvider implements InitializingBean {

    private final String secret;
    private final long tokenValidityInSeconds;
    private final RedisRepository redisRepository;
    private Key key;

    @Autowired
    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds,
            RedisRepository redisRepository
    ) {
        this.secret = secret;
        this.tokenValidityInSeconds = tokenValidityInSeconds * 1000;
        this.redisRepository = redisRepository;
    }

    // secret값을 Base64 Decode해서 key변수에 할당
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String getRefresh(String key) {
        String newKey = "refreshtoken_" + key;
        return redisRepository.get(newKey);
    }

    public void setRefresh(String key, String value, Long time) {
        String newKey = "refreshtoken_" + key;
        redisRepository.set(newKey, value);
        redisRepository.setExpire(newKey, time);
    }

    // access token
    public String generateAccess(String userId, String role) {
        return createToken(userId, role, TokenKey.ACCESS);
    }

    // refresh token
    public String generateRefresh(String userId, String role) {
        // refresh token 의 유효기간 확인
        Long ttl = redisRepository.getExpire("refreshtoken_" + userId);
        log.info("refresh token expiredIn: " + ttl);
        // refresh token 의 유효기간이 2일 이상 남았다면 기존 refresh token 반환
        if (ttl != null && ttl > tokenValidityInSeconds * 24 * 2) {
            return getRefresh(userId);
        }
        // refresh token 의 유효기간이 2일 이하로 남았다면 새로운 refresh token 발급
        return createToken(userId, role, TokenKey.REFRESH);
    }

    // access token, refresh token
    public Token generateToken(String userId, String role) {
        return Token.builder()
                .accessToken(generateAccess(userId, role))
                .refreshToken(generateRefresh(userId, role))
                .build();
    }

    // token key에 따라 해당 토큰의 유효기간을 설정하고 jwt 토큰 발급
    public String createToken(String userId, String role, TokenKey tokenKey) {
        Long period = getExpiration(tokenKey);

        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("role", role);

        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + period))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 유효성 검사
    public JwtCode validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return JwtCode.ACCESS;
        } catch (ExpiredJwtException e) {
            return JwtCode.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("jwtException = {}", e.getMessage());
        }
        return JwtCode.DENIED;
    }

    // 토큰에서 subject 추출
    public String getUid(String token) {
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰에서 claims 추출
    public Claims getClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            // 만료된 토큰에서 claims 추출
            return e.getClaims();
        }
    }

    // 토큰의 유효기간 설정
    public Long getExpiration(TokenKey tokenKey) {
        String delimiter = tokenKey.getKey();
        if (delimiter.equals(TokenKey.ACCESS.getKey())) {
            // 2시간
            return tokenValidityInSeconds * 24;
        } else if (delimiter.equals(TokenKey.REFRESH.getKey())) {
            // 1달
            return tokenValidityInSeconds * 24 * 30;
        } else {
            throw new RuntimeException();
        }
    }

    // 토큰에서 Bearer- 제거
    public String resolveToken(String bearerToken) {
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer-")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
