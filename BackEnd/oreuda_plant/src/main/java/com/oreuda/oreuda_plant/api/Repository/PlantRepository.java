package com.oreuda.oreuda_plant.api.Repository;

import com.oreuda.oreuda_plant.api.Domain.Entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, String> {

}
