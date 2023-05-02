package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.DailyCommit;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DailyCommitRepository {

	private final RedisTemplate redisTemplate;

	public void set(String userId, List<DailyCommit> value) {
		redisTemplate.opsForList().rightPush(getKey(userId), value);
	}

	private String getKey(String id) {
		return "daily_commit_" + id;
	}
}
