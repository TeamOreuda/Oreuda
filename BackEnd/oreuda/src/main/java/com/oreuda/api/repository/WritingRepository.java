package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Writing;

public interface WritingRepository extends JpaRepository<Writing, Long> {

}
