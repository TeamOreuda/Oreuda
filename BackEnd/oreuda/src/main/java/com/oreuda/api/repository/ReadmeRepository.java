package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.Readme;

public interface ReadmeRepository extends JpaRepository<Readme, Long> {
	Optional<Readme> findByUser_Id(String userId);
}
