package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Techstack;

public interface TechstackRepository extends JpaRepository<Techstack, Long> {

	List<Techstack> findByReadmeTechstack_IdOrderByOrder(Long readmeTechstackId);
}
