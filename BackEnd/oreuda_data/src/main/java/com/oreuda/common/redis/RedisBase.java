package com.oreuda.common.redis;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
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
	 * key값으로 끝나는 key의 value 데이터들 찾기
	 * @param key
	 * @param classType
	 * @return
	 * @param <T>
	 */
	public <T> List<T> getList(String key, Class<T> classType) {
		List<T> result = new ArrayList<>();
		redisTemplate.execute(new RedisCallback() {
			@Override
			public Object doInRedis(RedisConnection connection) throws DataAccessException {
				ScanOptions options = ScanOptions.scanOptions().match(key + "*").count(20).build();

				Cursor<byte[]> entries = connection.scan(options);

				while (entries.hasNext()) {
					String key = new String(entries.next());
					result.add(get(key, classType).orElseThrow());
				}

				return result;
			}
		});

		return result;
	}

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