package com.oreuda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oreuda.api.domain.entity.readme.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

}
