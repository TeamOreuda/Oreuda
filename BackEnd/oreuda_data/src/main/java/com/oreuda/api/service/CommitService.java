package com.oreuda.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.client.GitHubClient;
import com.oreuda.api.domain.entity.Commit;
import com.oreuda.api.repository.CommitRepository;
import com.oreuda.api.repository.RepoCommitRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.common.Model.Auth;
import com.oreuda.common.exception.GitHubException;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommitService {

	private final UserRepository userRepository;
	private final CommitRepository commitRepository;
	private final RepoCommitRepository repoCommitRepository;

	private final GitHubClient gitHubClient;

	private final ObjectMapper objectMapper;

	/**
	 * 사용자의 레포별 커밋 정보 불러오기
	 * @param userId
	 * @param query
	 */
	public void getCommitByRepository(String userId, String nameWithOwner, String query) {
		String accessToken = userRepository.get(Auth.ACCESS_TOKEN.getKey(), userId);

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();
		variables.put("authorId", userRepository.get(Auth.AUTHOR_ID.getKey(), userId));

		// 해당 Repository별
		variables.put("repoOwner", nameWithOwner.split("/")[0]);
		variables.put("repoName", nameWithOwner.split("/")[1]);

		JsonNode data;
		Map<String, Integer> dailyCommit = new HashMap<>();
		Map<Integer, Integer> yearlyCommit = new HashMap<>();
		do {
			// 1. GitHub API 호출
			data = gitHubClient.getCommitByRepository(accessToken, GraphQLRequest
				.builder().query(query).variables(variables).build());

			try {
				for (JsonNode cmt : data.get("nodes")) {
					// 2. JsonNode to Object
					Commit commit = objectMapper.treeToValue(cmt, Commit.class);
					commit.dateFormatter();
					// commitRepository.set(userId + "_" + commit.getId(), commit);

					String commitDate = commit.getDate();
					// 일자별 커밋
					if (dailyCommit.containsKey(commitDate)) {
						dailyCommit.put(commitDate, dailyCommit.get(commitDate) + 1);
					} else {
						dailyCommit.put(commitDate, 1);
					}

					int year = Integer.parseInt(commitDate.split("-")[0]);
					// 연도별 커밋
					if (yearlyCommit.containsKey(year)) {
						yearlyCommit.put(year, yearlyCommit.get(year) + 1);
					} else {
						yearlyCommit.put(year, 1);
					}

					// repoCommitRepository.set(userId,
					// 	RepoCommit.builder().dailyCommit(dailyCommit).yearlyCommit(yearlyCommit).build());
				}
			} catch (Exception e) {
				throw new GitHubException("Error parsing Commits");
			}

			// 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}
}
