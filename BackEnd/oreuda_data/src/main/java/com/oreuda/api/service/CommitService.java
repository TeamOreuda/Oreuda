package com.oreuda.api.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.client.GitHubClient;
import com.oreuda.api.domain.entity.Commit;
import com.oreuda.api.domain.entity.DailyCommit;
import com.oreuda.api.domain.entity.Repository;
import com.oreuda.api.domain.entity.YearlyCommit;
import com.oreuda.api.repository.CommitRepository;
import com.oreuda.api.repository.RepositoryRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.common.Model.Auth;
import com.oreuda.common.exception.GitHubException;
import com.oreuda.common.exception.NotFoundException;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommitService {

	private final UserRepository userRepository;
	private final CommitRepository commitRepository;
	private final RepositoryRepository repositoryRepository;

	private final GitHubClient gitHubClient;

	private final ObjectMapper objectMapper;

	/**
	 * 사용자의 레포별 커밋 정보 불러오기
	 * @param userId
	 * @param query
	 */
	public void getCommitByRepository(String userId, String query, String repoId, String nameWithOwner) {
		String accessToken = userRepository.get(Auth.ACCESS_TOKEN.getKey(), userId);

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();
		// 사용자 커밋 목록을 불러오기 위한 작성자ID
		variables.put("authorId", userRepository.get(Auth.AUTHOR_ID.getKey(), userId));

		// 해당 레포지토리별
		Repository repository = repositoryRepository.get(userId, repoId).orElseThrow(NotFoundException::new);
		variables.put("repoOwner", nameWithOwner.split("/")[0]);
		variables.put("repoName", nameWithOwner.split("/")[1]);

		JsonNode data;
		int commitCount = 0; // 해당 레포지토리의 사용자 커밋 수
		LocalDate now = LocalDate.now(); // 오늘 날짜
		Map<String, DailyCommit> dailyCommit = new HashMap<>(); // 일별 커밋
		Map<Integer, YearlyCommit> yearlyCommit = new HashMap<>(); // 연도별 커밋
		do {
			// 1. GitHub API 호출
			data = gitHubClient.getCommitByRepository(accessToken,
				GraphQLRequest.builder().query(query).variables(variables).build());
			if (data == null) return;

			// 사용자 커밋 수 카운팅
			commitCount += data.get("nodes").size();

			try {
				// 2. 커밋 preprocessing
				for (JsonNode cmt : data.get("nodes")) {
					// JsonNode to Object
					Commit commit = objectMapper.treeToValue(cmt, Commit.class);

					// YYYY-MM-DDTHH:MM:SSZ to YYYY-MM-DD HH:MM:SS UTC+9
					commit.dateFormatter();
					commitRepository.set(userId, commit.getId(), commit);

					// YYYY-MM-DD HH:MM:SS to YYYY-MM-DD to YYYY
					String date = commit.getDate().split(" ")[0];
					int year = Integer.parseInt(date.split("-")[0]);

					// 2018년도 이전 연도는 2018년도로 통합
					year = year < 2018 ? 2018 : year;

					// 연도별 커밋
					if (yearlyCommit.containsKey(year))
						yearlyCommit.put(year, YearlyCommit.builder().year(year).count(yearlyCommit.get(year).getCount() + 1).build());
					else
						yearlyCommit.put(year, YearlyCommit.builder().year(year).count(1).build());

					// String to LocalDate
					LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
					// 날짜간 차이 계산
					long days = ChronoUnit.DAYS.between(localDate, now);
					if (180 < days) continue;

					// 최근 180일 일자별 커밋
					if (dailyCommit.containsKey(date))
						dailyCommit.put(date, DailyCommit.builder().date(date).count(dailyCommit.get(date).getCount() + 1).build());
					else
						dailyCommit.put(date, DailyCommit.builder().date(date).count(1).build());
				}
			} catch (Exception e) {
				throw new GitHubException("Error parsing Commit");
			}

			// 3. 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());

		// 사용자 커밋 수
		repository.setCommitCount(commitCount);

		// 일자별 커밋 저장
		if (dailyCommit.values().size() != 0) {
			List<DailyCommit> dailyCommits = new ArrayList<>(dailyCommit.values());
			Collections.sort(dailyCommits, (o1, o2) -> o1.getDate().compareTo(o2.getDate()));
			repository.setDailyCommits(dailyCommits);
		}

		// 연도별 커밋 저장
		for (int y = 2018, nowYear = now.getYear(); y <= nowYear; y++) {
			// 해당 연도 커밋이 없을 경우, 0커밋으로 초기화
			if (!yearlyCommit.containsKey(y)) yearlyCommit.put(y, new YearlyCommit(y, 0));
		}
		List<YearlyCommit> yearlyCommits = new ArrayList<>(yearlyCommit.values());
		Collections.sort(yearlyCommits, (o1, o2) -> o1.getYear() - o2.getYear());
		repository.setYearlyCommit(yearlyCommits);

		repositoryRepository.set(userId, repoId, repository);
	}
}
