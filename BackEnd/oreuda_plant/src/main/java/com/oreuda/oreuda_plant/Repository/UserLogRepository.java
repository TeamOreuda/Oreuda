package com.oreuda.oreuda_plant.Repository;

import com.oreuda.oreuda_plant.Domain.Entity.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLogRepository extends JpaRepository<UserLog, String> {
    Optional<UserLog> findTopByUserIdOrderByTimeDesc(String userId);
    List<UserLog> findAllByUserId(String userId);
}
