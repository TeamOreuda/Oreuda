package com.oreuda.api.controller;

import javax.transaction.Transactional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
	public ResponseEntity<?> detailDiary(@RequestHeader HttpHeaders header, @RequestParam("userId") String userId) throws Exception {
		//String token = header.get("Authorization").get(0).substring(7);   // 헤더의 토큰 파싱 (Bearer 제거)
		//String userId = jwtUtil.getUid(token);

		UserDto userDto = userService.getUser(userId);
		return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
	}


}
