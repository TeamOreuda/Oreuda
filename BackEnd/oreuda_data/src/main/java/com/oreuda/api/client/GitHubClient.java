package com.oreuda.api.client;

import graphql.kickstart.spring.webclient.boot.GraphQLRequest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.oreuda.common.exception.GitHubException;

import lombok.RequiredArgsConstructor;

@Slf4j
@Component
@RequiredArgsConstructor
public class GitHubClient {

	private final static String GITHUB_URL = "https://api.github.com/graphql";
	private final WebClient webClient;

	public GitHubClient() {
		this.webClient = WebClient.builder()
			.baseUrl(GITHUB_URL)
			.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.build();
	}

	public JsonNode getRepositories(String accessToken, GraphQLRequest request) throws GitHubException {
		return webClient.post()
			.uri(GITHUB_URL)
			.header("Authorization", "Bearer " + accessToken)
			.bodyValue(request.getRequestBody())
			.retrieve()
			.bodyToMono(JsonNode.class)
			.block()
			.get("data")
			.get("viewer");
	}

	public JsonNode getCommitByRepository(String accessToken, GraphQLRequest request) throws GitHubException {
		return webClient.post()
			.uri(GITHUB_URL)
			.header("Authorization", "Bearer " + accessToken)
			.bodyValue(request.getRequestBody())
			.retrieve()
			.bodyToMono(JsonNode.class)
			.block()
			.get("data")
			.get("repository")
			.get("object")
			.get("history");
	}
}