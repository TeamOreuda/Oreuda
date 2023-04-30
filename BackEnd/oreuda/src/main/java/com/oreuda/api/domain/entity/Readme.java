package com.oreuda.api.domain.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.oreuda.api.domain.entity.readme.Boj;
import com.oreuda.api.domain.entity.readme.Contact;
import com.oreuda.api.domain.entity.readme.Gitstats;
import com.oreuda.api.domain.entity.readme.MostLanguage;
import com.oreuda.api.domain.entity.readme.ReadmeTechstack;
import com.oreuda.api.domain.entity.readme.Writing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Readme {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "readme_id")
	private Long id;

	// 사용자
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	// 리드미 종류
	@NotNull
	@Column(name = "readme_type")
	private String type;

	// 리드미 순서
	@NotNull
	@Column(name = "readme_order")
	private int order;

	// 글
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writing_id")
	private Writing writing;

	// 깃스택
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gitstats_id")
	private Gitstats gitstats;

	// 연락처
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "contact_id")
	private Contact contact;

	// 주로 사용하는 언어
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "most_language_id")
	private MostLanguage mostLanguage;


	// 리드미 기술 스택
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "readme_techstack_id")
	private ReadmeTechstack readmeTechstack;

	// 백준
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "boj_id")
	private Boj boj;

	public Readme() {
	}

}
