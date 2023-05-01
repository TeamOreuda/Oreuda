package com.oreuda.api.controller;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oreuda.api.domain.dto.SignUpDto;
import com.oreuda.api.domain.dto.UserDto;
import com.oreuda.api.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Transactional
public class UserController {

	private final UserService userService;

	// 첫 로그인 -> 회원가입
	@PostMapping()
	// 인증서버로부터 받는 값
	public ResponseEntity<?> firstLogin(@RequestBody SignUpDto signUpDto) {
		userService.signup(signUpDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 사용자 정보 조회
	@GetMapping()
	public ResponseEntity<?> getUser(@RequestHeader String userId) throws Exception {
		log.info(userId);

		UserDto userDto = userService.getUser(userId);
		return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
	}

	// 사용자 프로필 이미지 조회
	@GetMapping("/profile")
	public ResponseEntity<?> getImage(@RequestHeader String userId) throws Exception {
		log.info(userId);

		String userImage = userService.getImage(userId);
		return new ResponseEntity<String>(userImage, HttpStatus.OK);
	}

}
