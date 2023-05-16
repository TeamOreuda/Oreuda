package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Boj;

public interface BojRepository extends JpaRepository<Boj, Long> {

	Optional<Boj> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
