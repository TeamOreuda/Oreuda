package com.oreuda.oreuda_plant.api.Repository;

import com.oreuda.oreuda_plant.Common.Redis.RedisBase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class CommitRepository {

    private final RedisBase redisBase;

    public Map<String, Integer> getList(String userId, LocalDateTime dateTime) {
        return redisBase.getDailyCommitCount(getKey(userId), dateTime);
    }

    private String getKey(String id) {
        return "commit_" + id;
    }
}
