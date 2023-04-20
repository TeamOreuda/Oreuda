package com.oreuda.api.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.context.annotation.Profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "USER")
public class User {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "user_id")
	private Long id;

	// 사용자 프로필 이미지
	@NotNull
	@Column(name = "user_image")
	private String image;

	// 사용자 닉네임
	@NotNull
	@Column(name = "user_nickname")
	private String nickname;

	// 사용자 능력치
	@NotNull
	@Column(name = "user_stats")
	private int stats;

	// 사용자 가입 일자
	@Column(name = "user_join_date")
	@NotNull
	private LocalDate joinDate;

	// 사용자 리드미
	@Column(name = "user_readme", columnDefinition = "TEXT")
	private String readme;

	public User() {
	}

}
