package com.oreuda.api.client;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

public class GitHubClient {

	private final WebClient webClient;
	private final static String GITHUB_URL = "";

	public GitHubClient() {
		this.webClient = WebClient.builder()
			.baseUrl(GITHUB_URL)
			.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
			.build();
	}
}