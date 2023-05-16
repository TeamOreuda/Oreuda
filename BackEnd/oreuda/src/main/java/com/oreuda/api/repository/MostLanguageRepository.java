package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.MostLanguage;

public interface MostLanguageRepository extends JpaRepository<MostLanguage, Long> {
	Optional<MostLanguage> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
