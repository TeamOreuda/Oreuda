package com.oreuda.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ReadmeType {

	BOJ, GIT, WRITING, CONTACT, LANGUAGE, TECH, PLANT;

	@JsonCreator
	public static ReadmeType from(String s) {
		return ReadmeType.valueOf(s);
	}
}
