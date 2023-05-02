package com.oreuda.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.FolderDto;
import com.oreuda.api.domain.dto.InputFolderDto;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FolderService {

	private final FolderJpaRepository folderJpaRepository;
	private final RepositoryJpaRepository repositoryJpaRepository;

	public List<FolderDto> getFolders(String userId) {
		return null;
	}

	public void addFolder(String userId, InputFolderDto inputFolderDto) {
	}

	public void deleteFolder(String userId, List<FolderDto> folders) {
	}

	public void updateFolder(String userId, FolderDto folderDto) {
	}

	public List<FolderDto> rearrangeFolder(String userId, FolderDto folderDto) {
		return null;
	}
}
