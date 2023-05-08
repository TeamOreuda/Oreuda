package com.oreuda.api.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
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

	private final static List<String> repositoryTypes = Arrays.asList("repository.graphql", "org-repository.graphql", "collab-repository.graphql");

	/**
	 * 사용자의 모든 레포지토리 불러오기
	 * @param userId
	 */
	public void getAllRepositories(String userId) {
		// 사용자 레포지토리 정보 초기화
		userRepository.remove(userId);

		// 사용자의 모든 레포지토리 조회
		for(String repositoryType: repositoryTypes) {
			getRepositories(userId, repositoryType);
		}
	}

	/**
	 * 사용자의 레포지토리 정보 불러오기
	 * @param userId
	 */
	public void getRepositories(String userId, String graphqlFile) {
		String accessToken = userRepository.get(Auth.ACCESS_TOKEN.getKey(), userId);
		String query = loadQueryFile(graphqlFile);

		// GraphQL query 변수 설정
		Map<String, Object> variables = new HashMap<>();

		JsonNode data;
		do {
			// 1. GitHub API 호출
			data = gitHubClient.getRepositories(accessToken, GraphQLRequest
					.builder().query(query).variables(variables).build())
				.get("repositories");

			// 2. 레포지토리 preprocessing
			for (JsonNode repo : data.get("nodes")) {
				toRepository(userId, repo);
			}

			// 3. 다음 페이지 불러오기
			variables.put("cursor", data.get("pageInfo").get("endCursor"));
		} while (data.get("pageInfo").get("hasNextPage").booleanValue());
	}

	/**
	 * 레포지토리 전처리 및 레포지토리별 커밋 조회
	 * @param userId
	 * @param repo
	 */
	private void toRepository(String userId, JsonNode repo) {
		try {
			// JsonNode to Object
			Repository repository = objectMapper.treeToValue(repo, Repository.class);
			repository.dateFormatter();
			repositoryRepository.set(repository.getId(), repository);

			if (userRepository.isMember(userId, repository.getId())) return;
			// 해당 레포지토리가 이미 사용자 레포지토리 목록에 없으면 사용자 레포지토리에 저장
			userRepository.add(userId, repository.getId());

			// 레포지토리별 커밋
			commitService.getCommitByRepository(userId, loadQueryFile("commit.graphql"), repository.getId(), repository.getName());
		} catch (Exception e) {
			throw new GitHubException("Error parsing Repository");
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
