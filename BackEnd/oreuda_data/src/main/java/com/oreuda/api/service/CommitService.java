package com.oreuda.api.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.client.GitHubClient;
import com.oreuda.api.domain.entity.Commit;
import com.oreuda.api.domain.entity.DailyCommit;
import com.oreuda.api.domain.entity.YearlyCommit;
import com.oreuda.api.repository.CommitRepository;
import com.oreuda.api.repository.DailyCommitRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.api.repository.YearlyCommitRepository;
import com.oreuda.common.Model.Auth;
import com.oreuda.common.exception.GitHubException;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommitService {

	private final UserRepository userRepository;
	private final CommitRepository commitRepository;
	private final DailyCommitRepository dailyCommitRepository;
	private final YearlyCommitRepository yearlyCommitRepository;

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
		variables.put("authorId", userRepository.get(Auth.AUTHOR_ID.getKey(), userId));

		// 해당 레포지토리별
		variables.put("repoOwner", nameWithOwner.split("/")[0]);
		variables.put("repoName", nameWithOwner.split("/")[1]);

		JsonNode data;
		LocalDate now = LocalDate.now(); // 오늘 날짜
		Map<String, DailyCommit> dailyCommit = new HashMap<>();
		Map<Integer, YearlyCommit> yearlyCommit = new HashMap<>();
		do {
			// 1. GitHub API 호출
			data = gitHubClient.getCommitByRepository(accessToken, GraphQLRequest
				.builder().query(query).variables(variables).build());
			if (data == null) return;
			try {
				// 2. 커밋 preprocessing
				for (JsonNode cmt : data.get("nodes")) {
					// JsonNode to Object
					Commit commit = objectMapper.treeToValue(cmt, Commit.class);
					commit.dateFormatter();
					commitRepository.set(userId + "_" + commit.getId(), commit);

					// YYYY-MM-DD HH:MM:SS to YYYY-MM-DD
					String date = commit.getDate().split(" ")[0];
					int year = Integer.parseInt(date.split("-")[0]);

					// 연도별 커밋
					if (yearlyCommit.containsKey(year)) yearlyCommit.put(year, YearlyCommit.builder().year(year).count(yearlyCommit.get(year).getCount() + 1).build());
					else yearlyCommit.put(year, YearlyCommit.builder().year(year).count(1).build());

					// String to LocalDate
					LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
					// 날짜간 차이 계산
					long days = ChronoUnit.DAYS.between(localDate, now);
					if (180 < days) continue;

					// 최근 180일 일자별 커밋
					if (dailyCommit.containsKey(date)) dailyCommit.put(date, DailyCommit.builder().date(date).count(dailyCommit.get(date).getCount() + 1).build());
					else dailyCommit.put(date, DailyCommit.builder().date(date).count(1).build());
				}
			} catch (Exception e) {
				throw new GitHubException("Error parsing Commit");
			}

			// 3. 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());

		// 일자별 커밋 저장
		List<DailyCommit> dailyCommits = new ArrayList<>(dailyCommit.values());
		Collections.sort(dailyCommits, (o1, o2) -> o1.getDate().compareTo(o2.getDate()));
		dailyCommitRepository.set(userId + "_" + repoId, dailyCommits);

		// 연도별 커밋 저장
		List<YearlyCommit> yearlyCommits = new ArrayList<>(yearlyCommit.values());
		Collections.sort(yearlyCommits, (o1, o2) -> o1.getYear() - o2.getYear());
		yearlyCommitRepository.set(userId + "_" + repoId, yearlyCommits);
	}
}
