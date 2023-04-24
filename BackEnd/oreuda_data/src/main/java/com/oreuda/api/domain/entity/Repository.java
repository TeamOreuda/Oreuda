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
public class Repository {

	// 고유 ID
	@Id
	private String id;

	// 이름
	private String name;

	// 설명
	private String description;

	// URL
	private String url;

	// 주 사용언어
	private String language;

	// 공개여부
	private String isPublic;

	// star 수
	private int starCount;

	// 나의 커밋 수
	private int myCommitCount;

	// 수정일시
	private String updateDate;

	// 생성일시
	private String createDate;
}
