package com.oreuda.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oreuda.api.domain.entity.Folder;
import com.oreuda.api.domain.entity.User;

@Repository
public interface FolderJpaRepository extends JpaRepository<Folder, Long> {

	List<Folder> findByUserAndStatusNotOrderByOrder(User user, String status);
}
