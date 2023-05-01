package com.oreuda.api.repository;

import java.util.List;

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

	public void set(String key, Commit value) {
		redisBase.set(getKey(key), value);
	}

	private String getKey(String id) {
		return "commit_" + id;
	}
}
