package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.YearlyCommit;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class YearlyCommitRepository {

	private final RedisTemplate redisTemplate;

	public List<YearlyCommit> get(String key) {
		return redisTemplate.opsForList().range(getKey(key), 0, -1);
	}

	private String getKey(String id) {
		return "yearly_commit_" + id;
	}
}
