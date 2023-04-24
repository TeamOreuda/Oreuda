package com.oreuda.api.domain.entity;

import javax.persistence.Id;
import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Commit {

	// 고유 해시코드
	@Id
	private String sha;

	// 메시지
	private String message;

	// 작성일시
	private String date;
}
