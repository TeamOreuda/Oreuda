package com.oreuda.api.domain.entity;

import java.time.LocalDateTime;

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
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	// 폴더명
	@NotNull
	@Column(name = "folder_name")
	private String name;

	// 폴더 색상
	@NotNull
	@Column(name = "folder_color")
	private String color;

	// 폴더 상태
	@NotNull
	@Column(name = "folder_status", length = 36)
	private String status;

	// 폴더 순서
	@NotNull
	@Column(name = "folder_order")
	private int order;

	// 폴더 생성 일자
	@NotNull
	@Column(name = "folder_date")
	private LocalDateTime date;

	public Folder() {
	}

}
