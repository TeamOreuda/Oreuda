package com.oreuda.oreuda_plant.Repository;

import com.oreuda.oreuda_plant.Domain.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String userId);
}
