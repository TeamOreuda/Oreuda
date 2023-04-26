package com.oreuda.api.client;

import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.oreuda.api.domain.dto.RepositoryDto;

import graphql.kickstart.execution.GraphQLRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class GitHubClient {

	private final static String GITHUB_URL = "https://api.github.com/graphql";
	private final WebClient webClient;
	private GraphQLRequest graphQLRequest;

	public GitHubClient() {
		this.webClient = WebClient.builder()
			.baseUrl(GITHUB_URL)
			.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.build();
	}

	public void getRepositories(String accessToken, int perPage, String cursor) {

		webClient.post()
			.uri(GITHUB_URL)
			.header("Authorization", "Bearer " + accessToken)
			// .body(BodyInserters.fromValue(GraphQLRequest.builder()))
			.retrieve()
			.bodyToMono(RepositoryDto.class) // RepositoryDto API 응답을 파싱하는 클래스입니다.
			.subscribe(response -> {
				// 결과 처리 로직 작성
				// response의 getViewer()를 호출하여 결과 데이터에 접근할 수 있습니다.
			});
	}
}