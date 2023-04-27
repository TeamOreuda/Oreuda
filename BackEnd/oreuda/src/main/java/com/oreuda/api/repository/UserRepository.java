package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
