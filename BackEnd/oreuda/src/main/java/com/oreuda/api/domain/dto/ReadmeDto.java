package com.oreuda.api.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ReadmeDto {

	String readmeType;
	String bojValue;
	String bojTheme;
	String gitTheme;
	String writingTitle;
	String writingContents;
	String blogLink;
	String mailLink;
	String notionLink;
	String languageTheme;
	String languageType;
	List<String> techStack;
}
