package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Gitstats;

public interface GitstatsRepository extends JpaRepository<Gitstats, Long> {
	Optional<Gitstats> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
