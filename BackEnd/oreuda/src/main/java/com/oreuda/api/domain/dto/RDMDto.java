package com.oreuda.api.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RDMDto {

	int order;
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
	String languageValue;
	String languageTheme;
	String languageType;
	String techTitle;
	List<TechstackDto> techStack;
	String oreuValue;

	public void setTechStack(List<TechstackDto> techStack) {
		this.techStack = techStack;
	}
}
