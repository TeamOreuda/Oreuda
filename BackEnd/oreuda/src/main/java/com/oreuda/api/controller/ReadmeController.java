package com.oreuda.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oreuda.api.domain.dto.RDMDto;
import com.oreuda.api.domain.dto.ReadmeDto;
import com.oreuda.api.service.ReadmeService;
import com.oreuda.api.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/readme")
public class ReadmeController {

	private final UserService userService;
	private final ReadmeService readmeService;

	// 사용자 리드미 저장
	@PatchMapping()
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> saveReadme(@RequestHeader String userId, @RequestBody List<ReadmeDto> readmes) {
		readmeService.saveReadme(readmes, userId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 사용자 리드미 조회
	@GetMapping()
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> getReadme(@RequestHeader String userId) throws Exception {
		List<RDMDto> rdmDtoList = readmeService.getReadme(userId);
		for (RDMDto r:rdmDtoList) {
			System.out.println(r.toString());
		}
		return new ResponseEntity<List<RDMDto>>(rdmDtoList, HttpStatus.OK);
	}

}
