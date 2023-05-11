package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.ReadmeTechstack;

public interface ReadmeTechstackRepository extends JpaRepository<ReadmeTechstack, Long> {
	Optional<ReadmeTechstack> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
