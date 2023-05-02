package com.oreuda.oreuda_auth.api.provider;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER("USER", "일반 사용자");

    private final String key;
    private final String title;
}
