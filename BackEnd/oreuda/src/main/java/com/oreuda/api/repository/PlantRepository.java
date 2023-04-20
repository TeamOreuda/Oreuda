package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.Plant;

public interface PlantRepository extends JpaRepository<Plant, Long> {

}
