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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.client.GitHubClient;
import com.oreuda.api.domain.entity.Repository;
import com.oreuda.api.repository.RepositoryRepository;
import com.oreuda.api.repository.UserRepository;
import com.oreuda.common.Model.Auth;
import com.oreuda.common.exception.GitHubException;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RepositoryService {

	private final CommitService commitService;

	private final RepositoryRepository repositoryRepository;
	private final UserRepository userRepository;

	private final GitHubClient gitHubClient;

	private final ObjectMapper objectMapper;

	/**
	 * 사용자의 레포지토리 정보 불러오기
	 * @param userId
	 */
	public void getRepositories(String userId) {
		String accessToken = userRepository.get(Auth.ACCESS_TOKEN.getKey(), userId);
		String query = loadQueryFile("repository.graphql");

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();

		JsonNode data;
		do {
			// 1. GitHub API 호출
			data = gitHubClient.getRepositories(accessToken, GraphQLRequest
					.builder().query(query).variables(variables).build())
				.get("repositories");

			try {
				for (JsonNode repo : data.get("nodes")) {
					// 2. JsonNode to Object
					Repository repository = objectMapper.treeToValue(repo, Repository.class);
					repository.dateFormatter();
					// repositoryRepository.set(repository.getId(), repository);

					// 3. Repository별 Commit
					commitService.getCommitByRepository(userId, repository.getName(), loadQueryFile("commit.graphql"));
				}
			} catch (Exception e) {
				throw new GitHubException("Error parsing Repositories");
			}

			// 4. 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}

	/**
	 * 사용자 Organization의 레포지토리 정보 불러오기
	 * @param userId
	 */
	public void getOrgRepositories(String userId) {
		String accessToken = userRepository.get(Auth.ACCESS_TOKEN.getKey(), userId);
		String query = loadQueryFile("org-repository.graphql");

		// 1. GitHub API 호출
		JsonNode data = gitHubClient.getRepositories(accessToken, GraphQLRequest
				.builder().query(query).build())
			.get("organizations").get("nodes");

		try {
			for (JsonNode org : data) {
				for (JsonNode repo : org.get("repositories").get("nodes")) {
					// 2. JsonNode to Object
					Repository repository = objectMapper.treeToValue(repo, Repository.class);
					repository.dateFormatter();
					// repositoryRepository.set(repository.getId(), repository);

					// 3. Repository별 Commit
					commitService.getCommitByRepository(userId, repository.getName(), loadQueryFile("commit.graphql"));
				}
			}
		} catch (Exception e) {
			throw new GitHubException("Error parsing OrgRepositories");
		}
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
