package com.oreuda.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyCommitDto {

	// 커밋 일자(YYYY-MM-DD)
	String date;

	// 커밋 수
	int count;
}
