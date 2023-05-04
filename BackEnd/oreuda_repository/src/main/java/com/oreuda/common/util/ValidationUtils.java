package com.oreuda.common.util;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class ValidationUtils {

	// 숫자 검사
	public boolean isNumeric(String str) {
		return Pattern.matches("^[0-9]*$", str);
	}

	// 한국어, 영어, 숫자 검사
	public boolean isKoreanAlphaNumeric(String str) {
		return Pattern.matches("^[가-힣a-zA-Z0-9]*$", str);
	}

	// 한국어, 영어, 숫자, 특수문자(-,_,.), 공백 검사
	public boolean isAllowedFolderName(String str) {
		return Pattern.matches("^[\\w\\-.가-힣ㄱ-ㅎㅏ-ㅣ\\s]*$", str);
	}
}
