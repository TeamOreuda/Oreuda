package com.oreuda.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.RepositoryDto;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;
import com.oreuda.api.repository.RepositoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepositoryService {

	private final RepositoryRepository repositoryRepository;
	private final RepositoryJpaRepository repositoryJpaRepository;
	private final FolderJpaRepository folderJpaRepository;

	public List<RepositoryDto> getRepositories(String userId, String folderId, String filtering) {
		return null;
	}

	public List<RepositoryDto> moveRepository(String userId, String folderId, List<RepositoryDto> repositories) {
		return null;
	}
}
