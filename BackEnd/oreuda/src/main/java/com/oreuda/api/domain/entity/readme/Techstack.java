package com.oreuda.api.domain.entity.readme;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

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

	// 리드미 기술 스택
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "readme_techstack_id")
	private ReadmeTechstack readmeTechstack;

	// 기술 스택 이름
	@NotNull
	@Column(name = "techstack_name")
	private String name;

	// 기술 스택 색상
	@NotNull
	@Column(name = "techstack_color")
	private String color;

	// 기술 스택 순서
	@NotNull
	@Column(name = "techstack_order")
	private int order;

	// 기술 스택 고유 번호
	@NotNull
	@Column(name = "techstack_index")
	private int index;

	public Techstack() {
	}
}
