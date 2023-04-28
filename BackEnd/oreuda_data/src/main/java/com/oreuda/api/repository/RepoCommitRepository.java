package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.RepoCommit;
import com.oreuda.common.redis.RedisBase;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RepoCommitRepository {

	private final RedisBase redisBase;

	public Optional<RepoCommit> get(String key) {
		return redisBase.get(getKey(key), RepoCommit.class);
	}

	public void set(String key, RepoCommit value) {
		redisBase.set(getKey(key), value);
	}

	public void remove(String key) {
		redisBase.remove(getKey(key));
	}

	private String getKey(String id) {
		return "repo_commit_" + id;
	}
}
