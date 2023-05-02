package com.oreuda.common.Model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Auth {
	ACCESS_TOKEN("accesstoken_"),
	AUTHOR_ID("author_");

	private final String key;
}
