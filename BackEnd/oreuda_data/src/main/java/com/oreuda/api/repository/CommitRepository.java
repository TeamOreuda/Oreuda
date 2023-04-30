package com.oreuda.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.Commit;
import com.oreuda.common.redis.RedisBase;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommitRepository {

	private final RedisBase redisBase;

	public List<Commit> getList(String userId) {
		return redisBase.getList(getKey(userId), Commit.class);
	}

	public Optional<Commit> get(String key) {
		return redisBase.get(getKey(key), Commit.class);
	}

	public void set(String key, Commit value) {
		redisBase.set(getKey(key), value);
	}

	public void remove(String key) {
		redisBase.remove(getKey(key));
	}

	private String getKey(String id) {
		return "commit_" + id;
	}
}
