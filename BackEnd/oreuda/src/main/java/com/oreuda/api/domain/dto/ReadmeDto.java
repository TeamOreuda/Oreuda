package com.oreuda.api.domain.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ReadmeDto {

	@JsonProperty
	String readmeType;

	@JsonProperty
	String bojValue;

	@JsonProperty
	String bojTheme;

	@JsonProperty
	String gitValue;

	@JsonProperty
	String gitTheme;

	@JsonProperty
	String writingTitle;

	@JsonProperty
	String writingContents;

	@JsonProperty
	String blogLink;

	@JsonProperty
	String mailLink;

	@JsonProperty
	String notionLink;

	@JsonProperty
	String languageTheme;

	@JsonProperty
	String languageType;

	@JsonProperty
	List<String> techStack;
}
