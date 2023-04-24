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
public class MostLanguage {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "most_language_id")
	private Long id;

	// 테마
	@NotNull
	@Column(name = "most_language_theme")
	private String theme;

	public MostLanguage() {
	}

}
