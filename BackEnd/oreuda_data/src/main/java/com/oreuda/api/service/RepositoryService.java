package com.oreuda.api.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.client.GitHubClient;
import com.oreuda.api.domain.entity.Repository;
import com.oreuda.api.repository.RepositoryRepository;
import com.oreuda.common.exception.GitHubException;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepositoryService {

	private final RepositoryRepository repositoryRepository;
	private final GitHubClient gitHubClient;
	private final ObjectMapper objectMapper;

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

			// JsonNode to Object
			try {
				for (JsonNode repo : data.get("nodes")) {
					Repository repository = objectMapper.treeToValue(repo, Repository.class);
					// repositoryRepository.set(repository.getId(), repository);
					System.out.println(repository.getName());

				}
			} catch (Exception e) {
				throw new GitHubException("Error parsing Repositories");
			}

			// 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}

	/**
	 * 사용자 Organization의 레포지토리 정보 불러오기
	 * @param accessToken
	 */
	public void getOrgRepositories(String accessToken, String query) {
		// GitHub API 호출
		JsonNode data = gitHubClient.getRepositories(accessToken, GraphQLRequest
				.builder().query(query).build())
			.get("organizations").get("nodes");

		System.out.println("org-repo");
		System.out.println(data);

		// JsonNode to Object
		try {
			for (JsonNode org : data) {
				for (JsonNode repo : org.get("repositories").get("nodes")) {
					Repository repository = objectMapper.treeToValue(repo, Repository.class);
					// repositoryRepository.set(repository.getId(), repository);
					System.out.println(repository.getName());
				}
			}
		} catch (Exception e) {
			throw new GitHubException("Error parsing OrgRepositories");
		}
	}
}
