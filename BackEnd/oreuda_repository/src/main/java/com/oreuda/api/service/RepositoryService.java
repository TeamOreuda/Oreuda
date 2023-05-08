package com.oreuda.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.FolderRepository;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.domain.dto.RepositoryDto;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;
import com.oreuda.api.repository.RepositoryRepository;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.common.exception.NotFoundException;
import com.oreuda.common.exception.UnauthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepositoryService {

	private final UserJpaRepository userJpaRepositoryl;
	private final FolderJpaRepository folderJpaRepository;
	private final RepositoryJpaRepository repositoryJpaRepository;
	private final RepositoryRepository repositoryRepository;

	private final FolderService folderService;

	/**
	 * @param userId
	 * @param folderId
	 * @param filtering recent(최신순), commit(커밋순), name(이름순), star(별점순)
	 * @return
	 */
	public List<RepositoryDto> getRepositories(String userId, int folderId, String filtering) {
		Folder folder = folderJpaRepository.findById(Long.valueOf(folderId)).orElseThrow(NotFoundException::new);
		// 사용자 접근 권한 확인
		folderService.checkFolderAccessPermission(userId, folder.getUser().getId());

		List<FolderRepository> folderRepositories = repositoryJpaRepository.findByFolder_Id(Long.valueOf(folderId));
		List<RepositoryDto> repositories = new ArrayList<>();
		for(FolderRepository folderRepository: folderRepositories) {

		}


		return null;
	}

	public List<RepositoryDto> moveRepository(String userId, String folderId, List<RepositoryDto> repositories) {
		Folder folder = folderJpaRepository.findById(Long.valueOf(folderId)).orElseThrow(NotFoundException::new);
		// 사용자 접근 권한 확인
		folderService.checkFolderAccessPermission(userId, folder.getUser().getId());


		return null;
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
}
