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
public class FolderRepository {

	// 기본키
	@Id
	@GeneratedValue
	@Column(name = "repository_id")
	private Long id;

	// 폴더
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "folder_id")
	private Folder folder;

	// 레포지토리 url
	@NotNull
	@Column(name = "repository_url")
	private String url;

	public FolderRepository() {
	}

}
