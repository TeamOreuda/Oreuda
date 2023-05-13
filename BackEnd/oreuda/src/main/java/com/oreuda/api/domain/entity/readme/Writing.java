package com.oreuda.api.domain.entity.readme;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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
public class Writing {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "writing_id")
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
	@Column(name = "writing_title")
	private String title;

	// 내용
	@Lob
	@Column(name = "writing_contents", columnDefinition = "TEXT")
	private String contents;

	public Writing() {
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}
}
