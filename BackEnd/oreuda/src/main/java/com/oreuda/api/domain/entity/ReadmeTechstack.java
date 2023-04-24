package com.oreuda.api.domain.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class ReadmeTechstack {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "readme_techstack_id")
	private Long id;

	// 기술 스택
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "techstack_id")
	private Techstack techstack;

	public ReadmeTechstack() {
	}

}
