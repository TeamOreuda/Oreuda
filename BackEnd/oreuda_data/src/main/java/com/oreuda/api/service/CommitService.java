package com.oreuda.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.client.GitHubClient;
import com.oreuda.api.domain.entity.Commit;
import com.oreuda.api.domain.entity.Repository;
import com.oreuda.api.repository.CommitRepository;
import com.oreuda.common.exception.GitHubException;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommitService {

	private final GitHubClient gitHubClient;
	private final ObjectMapper objectMapper;
	private final CommitRepository commitRepository;

	/**
	 * 사용자의 레포별 커밋 정보 불러오기
	 * @param accessToken
	 * @param query
	 */
	public void getCommitByRepository(String accessToken, String query) {
		// userId가 redis에 없으면 getViewer로 얻어오는 로직
		String userId = "MDQ6VXNlcjQ5NjUwNzEy";

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();
		variables.put("userId", userId);

		// repository별
		String repoName = "ssaibrary";
		String repoOwner = "JJ-Planet";
		variables.put("repoName", repoName);
		variables.put("repoOwner", repoOwner);

		JsonNode data;
		do {
			data = gitHubClient.getCommitByRepository(accessToken, GraphQLRequest
					.builder().query(query).variables(variables).build());

			System.out.println("commit");
			System.out.println(data.get("nodes"));

			// JsonNode to Object
			try {
				for (JsonNode cmt : data.get("nodes")) {
					Commit commit = objectMapper.treeToValue(cmt, Commit.class);
					// key값으로 uuid도 추가하기
					// commitRepository.set(commit.getId(), commit);
					System.out.println(commit.getMessage());

				}
			} catch (Exception e) {
				throw new GitHubException("Error parsing Commits");
			}

			// 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}
}
