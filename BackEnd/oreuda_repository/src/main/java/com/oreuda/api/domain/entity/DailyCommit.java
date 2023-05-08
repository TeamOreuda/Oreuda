package com.oreuda.api.domain.entity;

import com.oreuda.api.domain.dto.DailyCommitDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyCommit {

	// 커밋 일자(YYYY-MM-DD)
	private String date;

	// 커밋 수
	private int count;

	// Entity to Dto
	public DailyCommitDto toDto() {
		return DailyCommitDto.builder()
			.date(date)
			.count(count)
			.build();
	}
}
