package com.oreuda.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public NotFoundException() {
		super("해당 정보를 찾을 수 없습니다.");
	}

	public NotFoundException(String msg) {
		super(msg);
	}
}
