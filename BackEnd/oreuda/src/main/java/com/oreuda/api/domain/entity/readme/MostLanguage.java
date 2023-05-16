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
public class MostLanguage {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "most_language_id")
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

	// 테마
	@NotNull
	@Column(name = "most_language_theme")
	private String theme;

	// 타입
	@NotNull
	@Column(name = "most_language_type")
	private String type;

	public MostLanguage() {
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public void setType(String type) {
		this.type = type;
	}
}
