package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.api.domain.dto.YearlyCommitDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class YearlyCommitRepository {

	private final RedisTemplate redisTemplate;
	private final ObjectMapper objectMapper;

	public List<YearlyCommitDto> get(String key) {
		return redisTemplate.opsForList().range(getKey(key), 0, -1);
		// return objectMapper.convertValue(redisTemplate.opsForValue().get(getKey(key)), List.class);
	}

	private String getKey(String id) {
		return "yearly_commit_" + id;
	}
}
