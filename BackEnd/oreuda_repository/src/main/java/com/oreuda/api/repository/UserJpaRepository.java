package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.User;

@Repository
public interface UserJpaRepository extends JpaRepository<User, String> {}
