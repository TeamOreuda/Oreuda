package com.oreuda.api.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Commit {

	// 고유 해시코드
	private String id;

	// 메시지
	private String message;

	// 작성일시
	@JsonProperty("committedDate")
	private String date;
}
