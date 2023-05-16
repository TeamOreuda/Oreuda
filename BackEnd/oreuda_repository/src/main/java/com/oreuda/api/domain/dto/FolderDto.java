package com.oreuda.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FolderDto {

	// 기본키
	Long id;

	// 폴더명
	String name;

	// 폴더 색상
	String color;

	// 폴더 순서
	int order;

	// 폴더 상태
	String status;

	// 해당 폴도의 레포지토리 수
	int repositoryCount;
}
