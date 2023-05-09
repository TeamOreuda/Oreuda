package com.oreuda.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.oreuda.common.redis.RedisBase;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RepositoryRepository {

	private final RedisBase redisBase;
	private final static String KEY = "repository_";

	public List<com.oreuda.api.domain.entity.Repository> getList(String userId) {
		return redisBase.getList(KEY + userId, com.oreuda.api.domain.entity.Repository.class);
	}

	public Optional<com.oreuda.api.domain.entity.Repository> get(String userId, String repoId) {
		return redisBase.get(getKey(userId, repoId), com.oreuda.api.domain.entity.Repository.class);
	}

	public void set(String userId, String repoId, com.oreuda.api.domain.entity.Repository value) {
		redisBase.set(getKey(userId, repoId), value);
	}

	private String getKey(String userId, String repoId) {
		return KEY + userId + "_" + repoId;
	}
}
