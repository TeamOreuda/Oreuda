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
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;

@Service
@Slf4j
public class TokenProvider implements InitializingBean {

    private final String secret;
    private final long tokenValidityInMilliseconds;
    private Key key;

    @Autowired
    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInMilliseconds
    ) {
        this.secret = secret;
        this.tokenValidityInMilliseconds = tokenValidityInMilliseconds;
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String getRefresh(String key) {
        return null;
    }

    public void setRefresh(String key, String value, Long time) {

    }

    public String generateAccess(String userId, String role) {
        return createToken(userId, role, TokenKey.ACCESS);
    }

    public String generateRefresh(String userId, String role) {
        return createToken(userId, role, TokenKey.REFRESH);
    }

    public Token generateToken(String userId, String role) {
        return Token.builder()
                .accessToken(generateAccess(userId, role))
                .refreshToken(generateRefresh(userId, role))
                .build();
    }

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

    public String getUid(String token) {
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody();
    }

    public Long getExpiration(TokenKey tokenKey) {
        String delimiter = tokenKey.getKey();
        if (delimiter.equals(TokenKey.ACCESS.getKey())) {
            return tokenValidityInMilliseconds;
        } else if (delimiter.equals(TokenKey.REFRESH.getKey())) {
            return tokenValidityInMilliseconds * 14;
        } else {
            throw new RuntimeException();
        }
    }

    public String resolveToken(String bearerToken) {
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer-")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
