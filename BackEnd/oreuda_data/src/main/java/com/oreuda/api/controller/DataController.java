package com.oreuda.api.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.oreuda.api.client.PlantClient;
import com.oreuda.api.repository.UserJpaRepository;
import com.oreuda.api.service.RepositoryService;
import com.oreuda.api.service.UserService;
import com.oreuda.common.exception.NotFoundException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/data")
@RequiredArgsConstructor
public class DataController {

	private final RepositoryService repositoryService;
	private final UserService userService;

	private final PlantClient plantClient;

	private final UserJpaRepository userJpaRepository;

	@PatchMapping()
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> data(@RequestHeader String userId) {
		// 현재 시간
		LocalDateTime now = LocalDateTime.now();
		// 마지막 업데이트 시간
		LocalDateTime lastUpdateTime = userJpaRepository.findById(userId)
			.orElseThrow(NotFoundException::new)
			.getUpdateTime();

		// 마지막 업데이트가 1분 이내일 때
		long seconds = ChronoUnit.SECONDS.between(lastUpdateTime, now);
		if (60 < seconds) {
			repositoryService.getAllRepositories(userId);
			userService.updateUser(userId);
			plantClient.notifyCompletion(userId); // 데이터 전처리 완료 알림
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
