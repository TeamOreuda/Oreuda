package com.oreuda.oreuda_auth.common.exception;

public class OAuth2RegistrationException extends RuntimeException {
    public OAuth2RegistrationException(String message) {
        super(message);
    }

    public OAuth2RegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
