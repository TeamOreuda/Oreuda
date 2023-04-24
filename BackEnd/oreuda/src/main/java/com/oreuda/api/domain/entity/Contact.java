package com.oreuda.api.domain.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Contact {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "contact_id")
	private Long id;

	// 블로그
	@Column(name = "contact_blog")
	private String blog;

	// 메일
	@Column(name = "contact_mail")
	private String mail;

	// 노션
	@Column(name = "contact_notion")
	private String notion;

	public Contact() {
	}

}
