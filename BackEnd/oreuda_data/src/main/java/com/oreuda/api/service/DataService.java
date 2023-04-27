package com.oreuda.api.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.oreuda.api.client.GitHubClient;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataService {

	private final static int PER_PAGE = 10;
	private final GitHubClient gitHubClient;

	public void getGitHubData(String userId) {
		String accessToken = "";

		getRepositories(accessToken);
		getOrgRepositories(accessToken);
	}

	/**
	 * 사용자의 레포지토리 정보 불러오기
	 * @param accessToken
	 */
	private void getRepositories(String accessToken) {
		String query = loadQueryFile("repository.graphqls");

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

	/**
	 * 사용자 Organization의 레포지토리 정보 불러오기
	 * @param accessToken
	 */
	private void getOrgRepositories(String accessToken) {
		String query = loadQueryFile("org-repository.graphqls");

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();
		variables.put("perPage", PER_PAGE);

		JsonNode data = gitHubClient.getRepositories(accessToken, GraphQLRequest
				.builder().query(query).variables(variables).build())
			.get("organizations");

		System.out.println("org-repo");
		System.out.println(data.get("edges"));
	}

	private String loadQueryFile(String fileName) {
		Resource resource = new ClassPathResource("graphql/" + fileName);
		try {
			InputStream inputStream = resource.getInputStream();
			return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
		} catch (IOException e) {
			throw new RuntimeException("Failed to load GraphQL query from file: " + fileName, e);
		}
	}
}
