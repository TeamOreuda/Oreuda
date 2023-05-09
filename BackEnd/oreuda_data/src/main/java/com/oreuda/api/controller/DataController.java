package com.oreuda.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oreuda.api.client.PlantClient;
import com.oreuda.api.service.RepositoryService;
import com.oreuda.api.service.UserService;
import lombok.extern.slf4j.Slf4j;

import lombok.RequiredArgsConstructor;

@Slf4j
@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {

	private final RepositoryService repositoryService;
	private final UserService userService;

	private final PlantClient plantClient;

	@PatchMapping()
	public ResponseEntity<?> data(@RequestHeader String userId) {
		log.info("userId: {}", userId);
		log.info("data_in_controller");
		repositoryService.getAllRepositories(userId);
		userService.updateUser(userId);
		log.info("update ok");
		// plantClient.notifyCompletion(userId); // 데이터 전처리 완료 알림
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
