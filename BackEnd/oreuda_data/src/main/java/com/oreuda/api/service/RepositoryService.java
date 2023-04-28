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
public class RepositoryService {

	private final GitHubClient gitHubClient;

	/**
	 * 사용자의 레포지토리 정보 불러오기
	 * @param accessToken
	 */
	public void getRepositories(String accessToken, String query) {
		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();

		JsonNode data;
		do {
			// GitHub API 호출
			data = gitHubClient.getRepositories(accessToken, GraphQLRequest
					.builder().query(query).variables(variables).build())
				.get("repositories");

			System.out.println("repo");
			System.out.println(data.get("nodes"));


			// 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}

	/**
	 * 사용자 Organization의 레포지토리 정보 불러오기
	 * @param accessToken
	 */
	public void getOrgRepositories(String accessToken, String query) {
		JsonNode data = gitHubClient.getRepositories(accessToken, GraphQLRequest
				.builder().query(query).build())
			.get("organizations");

		System.out.println("org-repo");
		System.out.println(data.get("nodes"));
	}
}
