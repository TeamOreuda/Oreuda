package com.oreuda.api.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class YearlyCommit {

	// 커밋 연도(YYYY)
	private int year;

	// 커밋 수
	private int count;
}
