package com.oreuda.api.domain.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Repository {

	// 고유 ID
	private String id;

	// 이름
	@JsonProperty("nameWithOwner")
	private String name;

	// 설명
	private String description;

	// URL
	private String url;

	// 주 사용언어
	@JsonProperty("primaryLanguage.name")
	private String language;

	// 공개여부
	private String isPrivate;

	// star 수
	@JsonProperty("stargazerCount")
	private int starCount;

	// 연도별 커밋
	private List<YearlyCommit> yearlyCommit = new ArrayList<>();

	// 일별 커밋
	private List<DailyCommit> dailyCommit = new ArrayList<>();

	// 수정일시
	@JsonProperty("updatedAt")
	private String updateDate;

	// 생성일시
	@JsonProperty("createdAt")
	private String createDate;
}
