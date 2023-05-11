package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Oreu;

public interface OreuRepository extends JpaRepository<Oreu, Long> {
	Optional<Oreu> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
