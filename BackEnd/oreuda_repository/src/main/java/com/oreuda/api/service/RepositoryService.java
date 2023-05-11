package com.oreuda.api.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.oreuda.api.domain.dto.InputRepositoryDto;
import com.oreuda.api.domain.dto.OutputRepositoryDto;
import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.FolderRepository;
import com.oreuda.api.domain.entity.Repository;
import com.oreuda.api.domain.dto.RepositoryDto;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;
import com.oreuda.api.repository.RepositoryRepository;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.common.exception.InvalidInputException;
import com.oreuda.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepositoryService {

	private final UserJpaRepository userJpaRepository;
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

		// 해당 폴더의 레포지토리ID 목록
		List<FolderRepository> folderRepositories = repositoryJpaRepository.findByFolder_Id(Long.valueOf(folderId));
		List<RepositoryDto> repositories = new ArrayList<>();

		for (FolderRepository folderRepository : folderRepositories) {
			// 레포지토리ID로 Redis에 있는 레포지토리 정보 불러오기
			Repository repository = repositoryRepository.get(userId, folderRepository.getId())
				.orElseThrow(NotFoundException::new);

			repositories.add(RepositoryDto.builder()
				.id(repository.getId())
				.name(repository.getName())
				.description(repository.getDescription())
				.url(repository.getUrl())
				.isPrivate(repository.getIsPrivate())
				.language(repository.getLanguage())
				.starCount(repository.getStarCount())
				.commitCount(repository.getCommitCount())
				.updateDate(repository.getUpdateDate())
				.dailyCommits(repository.getDailyCommits())
				.yearlyCommits(repository.getYearlyCommits())
				.build());
		}

		// recent(최신순), commit(커밋순), name(이름순), star(별점순)
		switch (filtering) {
			case "recent":
				Collections.sort(repositories, (o1, o2) -> o2.getUpdateDate().compareTo(o1.getUpdateDate()));
				break;
			case "commit":
				Collections.sort(repositories, (o1, o2) -> o2.getCommitCount() - o1.getCommitCount());
				break;
			case "name":
				Collections.sort(repositories, (o1, o2) -> o1.getName().compareToIgnoreCase(o2.getName()));
				break;
			case "star":
				Collections.sort(repositories, (o1, o2) -> o2.getStarCount() - o2.getStarCount());
				break;
			default:
				throw new InvalidInputException();
		}

		return repositories;
	}

	public List<OutputRepositoryDto> getRepositoriesByBaseFolder(String userId) {
		// 사용자의 기본 폴더 불러오기
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);
		Folder baseFolder = folderJpaRepository.findByUserAndStatus(user, "B");

		// 기본 폴더의 레포지토리ID 목록
		List<FolderRepository> folderRepositories = repositoryJpaRepository.findByFolder_Id(Long.valueOf(baseFolder.getId()));
		List<OutputRepositoryDto> repositories = new ArrayList<>();

		for (FolderRepository folderRepository : folderRepositories) {
			// 레포지토리ID로 Redis에 있는 레포지토리 정보 불러오기
			Repository repository = repositoryRepository.get(userId, folderRepository.getId())
				.orElseThrow(NotFoundException::new);

			repositories.add(OutputRepositoryDto.builder()
				.id(repository.getId())
				.name(repository.getName())
				.build());
		}

		// 이름순 정렬
		Collections.sort(repositories, (o1, o2) -> o1.getName().compareToIgnoreCase(o2.getName()));

		return repositories;
	}

	public List<RepositoryDto> moveRepository(String userId, InputRepositoryDto inputRepositoryDto) {
		// 레포지토리를 이동할 폴더 정보 불러오기
		Folder folder = folderJpaRepository.findById(Long.valueOf(inputRepositoryDto.getMoveFolderId()))
			.orElseThrow(NotFoundException::new);

		// 사용자 접근 권한 확인
		folderService.checkFolderAccessPermission(userId, folder.getUser().getId());

		for (String repositoryId : inputRepositoryDto.getRepositories()) {
			FolderRepository folderRepository = repositoryJpaRepository.findById(repositoryId)
				.orElseThrow(NotFoundException::new);

			// 선택된 레포지토리들의 지정된 폴더 변경
			folderRepository.updateFolder(folder);
			repositoryJpaRepository.save(folderRepository);
		}

		// 현재 있는 폴더의 레포지토리 목록 반환
		return getRepositories(userId, inputRepositoryDto.getNowFolderId(), inputRepositoryDto.getFiltering());
	}
}
