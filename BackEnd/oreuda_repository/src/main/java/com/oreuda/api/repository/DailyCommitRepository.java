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

	public List<DailyCommit> get(String key) {
		return redisTemplate.opsForList().range(getKey(key), 0, -1);
	}

	private String getKey(String id) {
		return "daily_commit_" + id;
	}
}
