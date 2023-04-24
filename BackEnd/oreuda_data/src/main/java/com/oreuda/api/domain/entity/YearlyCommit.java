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
public class YearlyCommit {

	// 커밋 연도(YYYY)
	@Id
	private int year;

	// 커밋 수
	private int count;
}
