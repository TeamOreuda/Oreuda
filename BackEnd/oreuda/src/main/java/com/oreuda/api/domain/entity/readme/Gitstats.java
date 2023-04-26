package com.oreuda.api.domain.entity.readme;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Gitstats {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "gitstats_id")
	private Long id;

	// 테마
	@NotNull
	@Column(name = "gitstats_theme")
	private String theme;

	public Gitstats() {
	}

}
