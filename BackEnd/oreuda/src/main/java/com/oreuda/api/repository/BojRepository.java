package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Boj;

public interface BojRepository extends JpaRepository<Boj, Long> {

}
