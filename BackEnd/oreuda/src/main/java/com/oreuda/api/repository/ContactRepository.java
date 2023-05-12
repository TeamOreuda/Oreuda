package com.oreuda.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
	Optional<Contact> findByUser_IdAndReadme_Id(String userId, Long readmeId);
}
