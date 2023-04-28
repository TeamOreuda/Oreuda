package com.oreuda.api.domain.entity;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepoCommit {

	// 연도별 커밋
	private Map<Integer, Integer> yearlyCommit = new HashMap<>();

	// 일별 커밋
	private Map<String, Integer> dailyCommit = new HashMap<>();
}
