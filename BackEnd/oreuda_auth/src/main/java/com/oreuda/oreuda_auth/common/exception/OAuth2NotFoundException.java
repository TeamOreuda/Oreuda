package com.oreuda.oreuda_auth.common.exception;

public class OAuth2NotFoundException extends RuntimeException {
    public OAuth2NotFoundException(String message) {
        super(message);
    }

    public OAuth2NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
