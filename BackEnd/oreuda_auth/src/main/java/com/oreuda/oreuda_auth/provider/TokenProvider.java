package com.oreuda.oreuda_auth.provider;

import com.oreuda.oreuda_auth.model.Token;
import com.oreuda.oreuda_auth.model.TokenKey;
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
    private Key key;
    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds,
            RedisTemplate<String, String> redisTemplate) {
        this.secret = secret;
        this.tokenValidityInSeconds = tokenValidityInSeconds;
        this.redisTemplate = redisTemplate;
    }
    // secret값을 Base64 Decode해서 key변수에 할당
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String getRefresh(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void setRefresh(String key, String value, Long time) {
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        vop.set(key, value);
        redisTemplate.expire(key, time, TimeUnit.SECONDS);
    }
    // access token
    public String generateAccess(String userId, String role) {
        return createToken(userId, role, TokenKey.ACCESS);
    }
    // refresh token
    public String generateRefresh(String userId, String role) {
        return createToken(userId, role, TokenKey.REFRESH);
    }
    //
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
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
    }
    // 토큰의 유효기간 설정
    public Long getExpiration(TokenKey tokenKey) {
        String delimiter = tokenKey.getKey();
        if (delimiter.equals(TokenKey.ACCESS.getKey())) {
            // 2시간
            return tokenValidityInSeconds * 2;
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
