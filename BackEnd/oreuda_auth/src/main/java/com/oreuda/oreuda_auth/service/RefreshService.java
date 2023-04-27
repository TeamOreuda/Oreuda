package com.oreuda.oreuda_auth.service;

import com.oreuda.oreuda_auth.model.TokenKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshService {

    public static Map<String,String> refreshAccessToken(String accessToken, String refreshToken) {
        Map<String,String> tokens = new HashMap<>();
        tokens.put(String.valueOf(TokenKey.ACCESS), accessToken);
        tokens.put(String.valueOf(TokenKey.REFRESH), refreshToken);
        return tokens;
    }
}
