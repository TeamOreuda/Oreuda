package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.FolderRepository;

@Repository
public interface RepositoryJpaRepository extends JpaRepository<FolderRepository, String> {}
