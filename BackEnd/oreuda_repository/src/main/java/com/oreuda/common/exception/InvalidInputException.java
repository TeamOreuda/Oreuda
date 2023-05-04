package com.oreuda.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidInputException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public InvalidInputException() {
		super("유효하지 않은 값입니다.");
	}

	public InvalidInputException(String msg) {
		super(msg);
	}
}
