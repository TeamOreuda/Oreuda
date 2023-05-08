package com.oreuda.api.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import com.oreuda.api.client.PlantClient;
import com.oreuda.api.domain.entity.Commit;
import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.FolderRepository;
import com.oreuda.api.domain.entity.Repository;
import com.oreuda.api.domain.entity.User;
import com.oreuda.api.repository.CommitRepository;
import com.oreuda.api.repository.FolderJpaRepository;
import com.oreuda.api.repository.RepositoryJpaRepository;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final CommitRepository commitRepository;

	private final UserJpaRepository userJpaRepository;
	private final FolderJpaRepository folderJpaRepository;
	private final RepositoryJpaRepository repositoryJpaRepository;

	public void updateUser(String userId) {
		// 사용자 레포지토리 정보
		Set<String> repositories = userRepository.members(userId);
		// 사용자 커밋 정보
		List<Commit> commits = commitRepository.getList(userId);

		// 사용자의 GitHub 정보 업데이트
		User user = userJpaRepository.findById(userId).orElseThrow(NotFoundException::new);
		user.updateGitHubData(repositories.size(), commits.size(), countStreak(commits),
			getMostLanguage(user.getNickname()), LocalDateTime.now());
		userJpaRepository.save(user);

		// 사용자의 폴더 정보
		List<Folder> folders = folderJpaRepository.findByUser(user);
		for (Folder folder : folders) {
			List<FolderRepository> folderRepositories = repositoryJpaRepository.findByFolder(folder);

			// 폴더가 지정되어있는 레포지토리 삭제
			for (FolderRepository folderRepository : folderRepositories) {
				repositories.remove(folderRepository.getId());
			}
		}

		if (repositories.size() == 0) return;
		// 해당 사용자의 기본 폴더 정보
		Folder baseFolder = folderJpaRepository.findByUserAndStatus(user, "B");
		Iterator<String> it = repositories.iterator();
		while (it.hasNext()) {
			// 폴더 미지정 레포지토리는 기본 폴더에 지정
			FolderRepository folderRepository = FolderRepository.builder().id(it.next()).folder(baseFolder).build();
			repositoryJpaRepository.save(folderRepository);
		}
	}

	/**
	 * 사용자의 최대 연속 스트릭 수 계산하기
	 * @param commits
	 * @return
	 */
	private int countStreak(List<Commit> commits) {
		if(commits.size() == 0) return 0;

		int streakCnt = 1, maxStreakCnt = 0;
		Collections.sort(commits, (o1, o2) -> o1.getDate().compareTo(o2.getDate()));
		LocalDate preDate = LocalDate.parse(commits.remove(0).getDate().split(" ")[0], DateTimeFormatter.ISO_DATE);

		for (Commit commit : commits) {
			LocalDate nowDate = LocalDate.parse(commit.getDate().split(" ")[0], DateTimeFormatter.ISO_DATE);

			if (preDate.isEqual(nowDate)) continue;

			if (preDate.plusDays(1).isEqual(nowDate)) {
				// 하루 연속이면 카운팅
				streakCnt++;
			} else {
				// 연속이 아니면 최대값 비교
				maxStreakCnt = Math.max(maxStreakCnt, streakCnt);
				streakCnt = 1;
			}

			preDate = nowDate;
		}

		return maxStreakCnt;
	}

	/**
	 * 사용자의 주 사용 언어 불러오기
	 * @param nickname
	 * @return
	 * @throws IOException
	 */
	private String getMostLanguage(String nickname) {
		String mostLanguage = "";
		try {
			Connection.Response response = Jsoup.connect(
					"https://github-readme-stats.vercel.app/api/top-langs/?username=" + nickname)
				.method(Connection.Method.GET)
				.ignoreContentType(true)
				.execute();
			Document googleDocument = response.parse();
			Element langName = googleDocument.select("text[class=lang-name]").first();
			if (langName == null) return mostLanguage;
			mostLanguage = langName.text();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return mostLanguage;
	}
}
