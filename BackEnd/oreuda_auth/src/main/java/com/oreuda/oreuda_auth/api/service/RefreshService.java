package com.oreuda.oreuda_auth.api.service;

import com.oreuda.oreuda_auth.common.model.TokenKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.TreeMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshService {

    public static Map<String,String> refreshAccessToken(String accessToken, String refreshToken) {
        Map<String,String> tokens = new TreeMap<>();
        tokens.put(String.valueOf(TokenKey.ACCESS.getKey()), accessToken);
        tokens.put(String.valueOf(TokenKey.REFRESH.getKey()), refreshToken);
        return tokens;
    }
}
