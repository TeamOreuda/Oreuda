package com.oreuda.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class YearlyCommitDto {

	// 커밋 연도(YYYY)
	int year;

	// 커밋 수
	int count;
}
