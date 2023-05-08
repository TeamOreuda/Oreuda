package com.oreuda.oreuda_plant.api.Repository;

import com.oreuda.oreuda_plant.api.Domain.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String userId);
}
