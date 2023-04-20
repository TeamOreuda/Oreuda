package com.oreuda.api.domain.entity;

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
public class Folder {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "folder_id")
	private Long id;

	// 사용자
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@NotNull
	private User user;

	// 폴더명
	@NotNull
	@Column(name = "folder_name")
	private String name;

	// 폴더 색상
	@NotNull
	@Column(name = "folder_color")
	private String color;

	public Folder() {
	}

}
