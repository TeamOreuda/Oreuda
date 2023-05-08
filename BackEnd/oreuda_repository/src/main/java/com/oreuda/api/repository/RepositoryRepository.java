package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.oreuda.common.redis.RedisBase;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RepositoryRepository {

	private final RedisBase redisBase;

	public Optional<com.oreuda.api.domain.entity.Repository> get(String userId, String repoId) {
		return redisBase.get(getKey(userId, repoId), com.oreuda.api.domain.entity.Repository.class);
	}

	private String getKey(String userId, String repoId) {
		return "repository_" + userId + "_" + repoId;
	}
}
