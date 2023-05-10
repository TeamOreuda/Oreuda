package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.UserLog;

public interface UserLogRepository extends JpaRepository<UserLog, Long> {

}
