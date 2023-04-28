package com.oreuda.oreuda_auth.repository;

import com.oreuda.oreuda_auth.domain.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<Auth, String> {

    Optional<Auth> findByAuthId(UUID authId);

    Optional<Auth> findByCode(String code);
}
