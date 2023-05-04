package com.oreuda.oreuda_plant.Common.Redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oreuda.oreuda_plant.api.Domain.Entity.Commit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisBase {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public Map<String, Integer> getDailyCommitCount(String key, LocalDateTime dateTime) {

        Map<String, Integer> result = new TreeMap<>(Collections.reverseOrder());

        redisTemplate.execute(new RedisCallback() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                ScanOptions options = ScanOptions.scanOptions().match(key + "*").count(20).build();
                Cursor<byte[]> entries = connection.scan(options);
                while (entries.hasNext()) {
                    String key = new String(entries.next());
                    Commit commit = get(key).orElseThrow();
//                    if (LocalDateTime.parse(commit.getDate()).isBefore(dateTime)) continue;
                    LocalDateTime date = LocalDateTime.parse(commit.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    String dateStr = date.toLocalDate().toString();
                    result.put(dateStr, result.getOrDefault(commit.getDate(), 0) + 1);
                }
                return result;
            }
        });

        return result;
    }

    public Optional<Commit> get(String key) {
        Object result = redisTemplate.opsForValue().get(key);
        return result == null ? Optional.empty()
                : Optional.of(objectMapper.convertValue(result, Commit.class));
    }
}
