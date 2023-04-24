package com.oreuda.config;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableCaching
@RequiredArgsConstructor
public class RedisConfig {

	private final RedisProperties redisProperties;

	/**
	 * Redis 서버와 연결하기 위해  연결 정보를 담은 RedisConnectionFactory 객체 생성
	 * @return
	 */
	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(redisProperties.getHost(), redisProperties.getPort());
		redisStandaloneConfiguration.setPassword(redisProperties.getPassword());
		return new LettuceConnectionFactory(redisStandaloneConfiguration);
	}

	/**
	 * Redis 데이터를 쉽게 다룰 수 있게 하는 RedisTemplate 객체 생성
	 * @param redisConnectionFactory
	 * @return
	 */
	@Bean
	public RedisTemplate<String, Object> redisTemplate(
		RedisConnectionFactory redisConnectionFactory) {
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory);
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(Object.class));
		return redisTemplate;
	}

	/**
	 * 자주 사용되는 데이터를 캐싱
	 * @param redisConnectionFactory
	 * @return
	 */
	@Bean
	public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
		return RedisCacheManager.builder(redisConnectionFactory)
			.cacheDefaults(defaultCacheConfiguration())
			.withInitialCacheConfigurations(customCacheConfiguration()).build();
	}

	/**
	 * Redis에 저장된 데이터를 효율적으로 관리하기 위해 캐시된 데이터에 대한 설정 지정
	 * @return Redis 캐시에 대한 기본 구성
	 */
	private RedisCacheConfiguration defaultCacheConfiguration() {
		return RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofSeconds(10))
			.serializeKeysWith(SerializationPair.fromSerializer(new StringRedisSerializer()))
			.serializeValuesWith(
				SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
	}

	/**
	 * Redis 캐시의 사용자 지정
	 * @return
	 */
	private Map<String, RedisCacheConfiguration> customCacheConfiguration() {
		Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
		cacheConfigurations.put("user",
			defaultCacheConfiguration().entryTtl(Duration.ofMinutes(10)));
		return cacheConfigurations;
	}
}
