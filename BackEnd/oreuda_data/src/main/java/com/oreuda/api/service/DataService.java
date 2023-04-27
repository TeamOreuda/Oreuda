package com.oreuda.api.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataService {

	private final RepositoryService repositoryService;
	private final CommitService commitService;

	public void getGitHubData(String userId) {
		String accessToken = "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";

		repositoryService.getRepositories(accessToken, loadQueryFile("repository.graphql"));
		repositoryService.getOrgRepositories(accessToken, loadQueryFile("org-repository.graphql"));
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
