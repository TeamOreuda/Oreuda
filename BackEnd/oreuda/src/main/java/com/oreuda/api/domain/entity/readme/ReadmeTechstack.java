package com.oreuda.api.domain.entity.readme;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.oreuda.api.domain.entity.Readme;
import com.oreuda.api.domain.entity.User;

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

	// 사용자
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	// 리드미
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "readme_id")
	private Readme readme;

	// 순서
	@NotNull
	@Column(name = "readme_order")
	private int order;

	// 제목
	@Column(name = "readme_techstack_title")
	private String title;

	public ReadmeTechstack() {
	}

}
