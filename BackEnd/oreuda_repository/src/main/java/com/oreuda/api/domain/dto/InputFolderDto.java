package com.oreuda.api.domain.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InputFolderDto {

	// 기본키
	Long id;

	// 폴더명
	String name;

	// 폴더 색상
	String color;

	// 폴더 순서
	int order;

	// 해당 폴더의 레포지토리
	List<String> repositories = new ArrayList<>();
}
