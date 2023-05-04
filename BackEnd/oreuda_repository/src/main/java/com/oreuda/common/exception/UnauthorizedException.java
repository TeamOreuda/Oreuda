package com.oreuda.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public UnauthorizedException() {
		super("권한이 없는 사용자입니다.");
	}

	public UnauthorizedException(String msg) {
		super(msg);
	}
}
