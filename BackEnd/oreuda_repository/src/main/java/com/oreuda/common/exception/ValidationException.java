package com.oreuda.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ValidationException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public ValidationException() {
		super("유효하지 않은 값입니다.");
	}

	public ValidationException(String msg) {
		super(msg);
	}
}
