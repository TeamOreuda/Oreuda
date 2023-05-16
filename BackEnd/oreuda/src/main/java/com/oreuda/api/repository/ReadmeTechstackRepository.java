package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.ReadmeTechstack;

public interface ReadmeTechstackRepository extends JpaRepository<ReadmeTechstack, Long> {
	List<ReadmeTechstack> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
