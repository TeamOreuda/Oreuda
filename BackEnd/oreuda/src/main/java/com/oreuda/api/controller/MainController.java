package com.oreuda.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oreuda.api.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/main")
public class MainController {

	private final UserService userService;

	// 유저수 조회
	@GetMapping("/ru")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> getCountUser() {
		Long resisteredUser = userService.getCountUser();
		return new ResponseEntity<Long>(resisteredUser, HttpStatus.OK);
	}

}
