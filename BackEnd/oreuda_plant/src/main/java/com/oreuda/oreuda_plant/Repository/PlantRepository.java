package com.oreuda.oreuda_plant.Repository;

import com.oreuda.oreuda_plant.Domain.Entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, String> {

}
