package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.Folder;

public interface FolderRepository extends JpaRepository<Folder, Long> {

}
