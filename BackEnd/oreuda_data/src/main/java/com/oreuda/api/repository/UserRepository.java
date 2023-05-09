package com.oreuda.api.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

	private final RedisTemplate redisTemplate;

	public String get(String type, String userId) {
		return redisTemplate.opsForValue().get(type + userId).toString();
	}
}
