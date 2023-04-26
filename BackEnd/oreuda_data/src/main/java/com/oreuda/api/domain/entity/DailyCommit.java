package com.oreuda.api.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyCommit {

	// 커밋 일자(YYYY-MM-DD)
	@Id
	private String date;

	// 커밋 수
	private int count;
}
