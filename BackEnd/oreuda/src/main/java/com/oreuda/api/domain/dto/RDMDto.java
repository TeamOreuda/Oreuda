package com.oreuda.api.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RDMDto {

	String readmeType;
	String bojValue;
	String bojTheme;
	String gitValue;
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
