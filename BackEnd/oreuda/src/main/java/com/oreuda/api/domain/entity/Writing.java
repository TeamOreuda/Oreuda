package com.oreuda.api.domain.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Writing {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "writing_id")
	private Long id;

	// 제목
	@Column(name = "writing_title")
	private String title;

	// 내용
	@Lob
	@Column(name = "writing_contents", columnDefinition = "TEXT")
	private String contents;

	public Writing() {
	}

}
