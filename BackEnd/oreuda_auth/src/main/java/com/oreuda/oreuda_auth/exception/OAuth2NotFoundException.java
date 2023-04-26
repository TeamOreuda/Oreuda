package com.oreuda.oreuda_auth.exception;

public class OAuth2NotFoundException extends RuntimeException {
    public OAuth2NotFoundException(String message) {
        super(message);
    }

    public OAuth2NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
