package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Writing;

public interface WritingRepository extends JpaRepository<Writing, Long> {
	List<Writing> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
