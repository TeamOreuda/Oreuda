package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.oreuda.common.redis.RedisBase;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RepositoryRepository {

	private final RedisBase redisBase;

	public Optional<com.oreuda.api.domain.entity.Repository> get(String key) {
		return redisBase.get(getKey(key), com.oreuda.api.domain.entity.Repository.class);
	}

	private String getKey(String id) {
		return "repository_" + id;
	}
}
