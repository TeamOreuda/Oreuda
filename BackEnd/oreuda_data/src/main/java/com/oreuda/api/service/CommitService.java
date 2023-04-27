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

	private final static int PER_PAGE = 10;
	private final GitHubClient gitHubClient;

	/**
	 * 사용자의 커밋 정보 불러오기
	 * @param accessToken
	 * @param query
	 */
	public void getRepositories(String accessToken, String query) {
		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();
		variables.put("perPage", PER_PAGE);

		JsonNode data;
		do {
			data = gitHubClient.getRepositories(accessToken, GraphQLRequest
					.builder().query(query).variables(variables).build())
				.get("repositories");

			System.out.println("repo");
			System.out.println(data.get("edges"));
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}
}
