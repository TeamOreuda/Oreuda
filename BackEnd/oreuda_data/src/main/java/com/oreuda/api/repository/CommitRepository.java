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
	private final static String KEY = "commit_";

	public List<Commit> getList(String userId) {
		return redisBase.getList(KEY + userId, Commit.class);
	}

	public void set(String userId, String commitId, Commit value) {
		redisBase.set(getKey(userId, commitId), value);
	}

	private String getKey(String userId, String commitId) {
		return KEY + userId + "_" + commitId;
	}
}
