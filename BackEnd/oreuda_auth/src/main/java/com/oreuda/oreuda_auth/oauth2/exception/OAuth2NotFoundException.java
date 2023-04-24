package com.oreuda.oreuda_auth.oauth2.exception;

public class OAuth2NotFoundException extends RuntimeException {
    public OAuth2NotFoundException(String message) {
        super(message);
    }

    public OAuth2NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
