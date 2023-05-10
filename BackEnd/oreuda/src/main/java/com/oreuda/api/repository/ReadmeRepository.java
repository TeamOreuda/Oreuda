package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.Readme;

public interface ReadmeRepository extends JpaRepository<Readme, Long> {

}
