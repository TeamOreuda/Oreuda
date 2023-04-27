package com.oreuda.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.oreuda.api.client.GitHubClient;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommitService {

	private final GitHubClient gitHubClient;

	/**
	 * 사용자의 레포별 커밋 정보 불러오기
	 * @param accessToken
	 * @param query
	 */
	public void getCommitByRepository(String accessToken, String query) {
		// userId가 redis에 없으면 getViewer로 얻어오는 로직
		String userId = "";

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();
		variables.put("userId", userId);

		// repository별
		String repoName = "";
		String repoOwner = "";
		variables.put("repoName", repoName);
		variables.put("repoOwner", repoOwner);

		JsonNode data;
		do {
			data = gitHubClient.getCommitByRepository(accessToken, GraphQLRequest
					.builder().query(query).variables(variables).build());

			System.out.println("commit");
			System.out.println(data.get("nodes"));
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}
}
