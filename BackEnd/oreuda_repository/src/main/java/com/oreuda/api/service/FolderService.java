package com.oreuda.api.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.FolderRepository;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.domain.dto.FolderDto;
import com.oreuda.api.domain.dto.InputFolderDto;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.common.exception.NotFoundException;
import com.oreuda.common.exception.InvalidInputException;
import com.oreuda.common.exception.UnauthorizedException;
import com.oreuda.common.util.ValidationUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
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
		isAllowedFolderName(userId, inputFolderDto.getName());

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

	public void deleteFolder(String userId, List<Integer> folders) {
		// 기본 폴더 삭제 못하게
		for (int folderId : folders) {
			Folder folder = folderJpaRepository.findById(Long.valueOf(folderId)).orElseThrow(NotFoundException::new);

			if (folder.getStatus().equals("B"))
				continue;
			checkFolderAccessPermission(userId, folder.getUser().getId());
			folder.deleteFolder();
			folderJpaRepository.save(folder);
		}
	}

	public void updateFolder(String userId, FolderDto folderDto) {
		Folder folder = folderJpaRepository.findById(Long.valueOf(folderDto.getId()))
			.orElseThrow(NotFoundException::new);

		checkFolderAccessPermission(userId, folder.getUser().getId());
		folder.updateFolder(folderDto.getName(), folderDto.getColor());
	}

	public List<FolderDto> rearrangeFolder(String userId, FolderDto folderDto) {
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);
		Folder folder = folderJpaRepository.findById(Long.valueOf(folderDto.getId()))
			.orElseThrow(NotFoundException::new);

		int orgOrder = folder.getOrder();
		int newOrder = folderDto.getOrder();
		List<Folder> folders = folderJpaRepository.findByUserAndStatusNotOrderByOrder(user, "D");
		if (orgOrder < newOrder) {
			// 뒤로 순서를 이동하는 경우
			folders.add(newOrder, folders.remove(orgOrder));
			for (int i = orgOrder, size = folders.size(); i < size; i++) {
				folders.get(i).updateOrder(i);
			}
		} else if (orgOrder > newOrder) {
			// 앞으로 순서를 이동하는 경우
			folders.add(newOrder, folders.remove(orgOrder));
			for (int i = newOrder, size = folders.size(); i < size; i++) {
				folders.get(i).updateOrder(i);
			}
		}

		return folders
			.stream()
			.map(Folder::toDto)
			.collect(Collectors.toList());
	}

	/**
	 * 해당 폴더에 대한 사용자 권한 확인
	 * @param userId
	 * @param folderUserId
	 */
	private void checkFolderAccessPermission(String userId, String folderUserId) {
		if (!userId.equals(folderUserId))
			throw new UnauthorizedException();
	}

	/**
	 * 폴더명 유효성 검사
	 * @param userId
	 * @param folderName
	 */
	private void isAllowedFolderName(String userId, String folderName) {
		// 글자수 최대 20자 제한
		if (20 < folderName.length())
			throw new InvalidInputException("폴더명 글자수는 최대 20자로 제한 됩니다.");

		// 영어, 한국어, 숫자, 특수문자(-,_,.), 공백만 가능
		if (!validationUtils.isAllowedFolderName(folderName))
			throw new InvalidInputException("유효한 폴더명이 아닙니다.");

		// 폴더명 중복 검사
		List<FolderDto> folders = getFolders(userId);
		for (FolderDto folder : folders) {
			if (folderName.equals(folder.getName()))
				throw new InvalidInputException("이미 존재하는 폴더명 입니다.");
		}
	}
}
