package com.oreuda.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GitHubException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public GitHubException() {
		super("GitHub API error.");
	}

	public GitHubException(String msg) {
		super(msg);
	}
}