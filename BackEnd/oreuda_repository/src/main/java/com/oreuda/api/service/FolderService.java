package com.oreuda.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.FolderRepository;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.domain.dto.FolderDto;
import com.oreuda.api.domain.dto.InputFolderDto;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.common.exception.NotFoundException;
import com.oreuda.common.exception.ValidationException;
import com.oreuda.common.util.ValidationUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FolderService {

	private final UserJpaRepository userJpaRepository;
	private final FolderJpaRepository folderJpaRepository;
	private final RepositoryJpaRepository repositoryJpaRepository;
	private final ValidationUtils validationUtils;

	public List<FolderDto> getFolders(String userId) {
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);
		return folderJpaRepository.findByUserAndStatusNotOrderByOrder(user, "D")
			.stream()
			.map(Folder::toDto)
			.collect(Collectors.toList());
	}

	public void addFolder(String userId, InputFolderDto inputFolderDto) {
		// 폴더명 유효성 검사
		if (!validationUtils.isAllowedFolderName(inputFolderDto.getName()))
			throw new ValidationException("유효한 폴더명이 아닙니다.");

		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);
		Folder folder = Folder.builder()
			.user(user)
			.name(inputFolderDto.getName())
			.color(inputFolderDto.getColor())
			.order(getFolders(userId).size())
			.status("V")
			.date(LocalDateTime.now())
			.build();

		// 생성된 폴더 저장
		folderJpaRepository.save(folder);

		// 레포지토리를 해당 폴더에 지정
		for (String id : inputFolderDto.getRepositories()) {
			repositoryJpaRepository.save(FolderRepository.builder().id(id).folder(folder).build());
		}
	}

	public void deleteFolder(String userId, List<FolderDto> folders) {

	}

	public void updateFolder(String userId, FolderDto folderDto) {
	}

	public List<FolderDto> rearrangeFolder(String userId, FolderDto folderDto) {
		return null;
	}
}
