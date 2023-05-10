package com.oreuda.api.domain.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

	// 주 사용언어 객체
	private PrimaryLanguage primaryLanguage;

	// 주 사용언어
	private String language;

	// 공개여부
	private String isPrivate;

	// star 수
	@JsonProperty("stargazerCount")
	private int starCount;

	// 수정일시
	@JsonProperty("updatedAt")
	private String updateDate;

	// 생성일시
	@JsonProperty("createdAt")
	private String createDate;

	// 사용자 커밋 수
	private int commitCount;

	// 일별 커밋
	private List<DailyCommit> dailyCommits = new ArrayList<>();

	// 연도별 커밋
	private List<YearlyCommit> yearlyCommits = new ArrayList<>();

	public void setCommitCount(int commitCount) {
		this.commitCount = commitCount;
	}

	public void setDailyCommits(List<DailyCommit> dailyCommits) {
		this.dailyCommits = dailyCommits;
	}

	public void setYearlyCommit(List<YearlyCommit> yearlyCommits) {
		this.yearlyCommits = yearlyCommits;
	}

	public void setLanguage() {
		this.language = primaryLanguage == null ? "" : primaryLanguage.getName();
	}

	// YYYY-MM-DDTHH:MM:SSZ to YYYY-MM-DD
	public void dateFormatter() {
		this.createDate = this.createDate.split("T")[0];
		this.updateDate = this.updateDate.split("T")[0];
	}
}