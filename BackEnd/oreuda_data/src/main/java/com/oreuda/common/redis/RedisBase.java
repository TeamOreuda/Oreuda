package com.oreuda.common.redis;

import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisBase {

	private final RedisTemplate redisTemplate;
	private final ObjectMapper objectMapper;

	/**
	 * redis에서 해당 key의 value 반환
	 * @param key
	 * @param classType 데이터 타입
	 * @return
	 * @param <T>
	 */
	public <T> Optional<T> get(String key, Class<T> classType) {
		Object result = redisTemplate.opsForValue().get(key);
		return result == null ? Optional.empty()
			: Optional.of(objectMapper.convertValue(result, classType));
	}

	/**
	 * redis에 데이터 저장
	 * @param key
	 * @param value
	 * @param <T> 데이터 타입
	 */
	public <T> void set(String key, T value) {
		redisTemplate.opsForValue().set(key, value);
	}

	/**
	 * redis에서 데이터 삭제
	 * @param key
	 */
	public void remove(String key) {
		redisTemplate.delete(key);
	}
}