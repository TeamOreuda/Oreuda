package com.oreuda.api.domain.entity.readme;


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
public class Techstack {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "techstack_id")
	private Long id;

	// 기술 스택 이름
	@Column(name = "techstack_name")
	private String name;

	// 기술 스택 순서
	@Column(name = "techstack_order")
	private int order;

	public Techstack() {
	}

}
