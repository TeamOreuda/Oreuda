package com.oreuda.api.domain.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.oreuda.api.domain.dto.FolderDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
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

	// 해당 폴더의 레포지토리 목록
	@OneToMany(mappedBy = "folder", fetch = FetchType.EAGER)
	private List<FolderRepository> repositories = new ArrayList<>();

	// Entity to Dto
	public FolderDto toDto() {
		return FolderDto.builder()
			.id(id)
			.name(name)
			.color(color)
			.order(order)
			.repositoryCount(repositories.size())
			.build();
	}

	public void updateFolder(String name, String color) {
		this.name = name;
		this.color = color;
	}

	public void updateOrder(int order) {
		this.order = order;
	}

	public void deleteFolder() {
		this.status = "D";
	}
}
