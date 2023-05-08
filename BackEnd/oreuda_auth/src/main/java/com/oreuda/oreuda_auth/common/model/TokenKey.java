package com.oreuda.oreuda_auth.common.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TokenKey {
    ACCESS("Authorization"), REFRESH("RefreshToken");

    private String key;

    TokenKey(String key) {
        this.key = key;
    }
}
