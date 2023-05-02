package com.oreuda.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oreuda.api.service.RepositoryService;
import com.oreuda.api.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {

	private final RepositoryService repositoryService;
	private final UserService userService;

	@PatchMapping()
	public ResponseEntity<?> data(@RequestHeader String userId) {
		repositoryService.getAllRepositories(userId);
		userService.updateUser(userId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
