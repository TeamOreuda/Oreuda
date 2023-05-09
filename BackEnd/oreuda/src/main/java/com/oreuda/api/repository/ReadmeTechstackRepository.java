package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.ReadmeTechstack;

public interface ReadmeTechstackRepository extends JpaRepository<ReadmeTechstack, Long> {

}
