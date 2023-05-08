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
public class InputRepositoryDto {

	// 현재 폴더 기본키
	int nowFolderId;

	// 필터링
	String filtering;

	// 이동할 폴더 기본키
	int moveFolderId;

	// 이동할 레포지토리 목록
	List<String> repositories = new ArrayList<>();
}
