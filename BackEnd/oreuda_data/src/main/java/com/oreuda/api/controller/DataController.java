package com.oreuda.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oreuda.api.service.DataService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {

	private final DataService dataService;

	@GetMapping
	public ResponseEntity<?> data() {
		dataService.getGitHubData("userId");
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
