package com.oreuda.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.oreuda.api.domain.dto.ReadmeDto;

@RestController
public class TestController {

	@GetMapping("/api/v1/business-service")
	public String springCloudService() {
		return "business-service 호출!";
	}

	@GetMapping("/api/v1/test")
	public String test(@RequestHeader String userId) {
		return "test 호출!";
	}

	@PatchMapping("/api/v1/test/readme")
	public ResponseEntity<?> testReadme(@RequestBody ReadmeDto read) {

		System.out.println(read.toString());
		// ReadmeType type = ReadmeType.from(read.getType());
		// if(type == ReadmeType.BOJ){
		// 	System.out.println("ok");
		// }

		return new ResponseEntity<>(HttpStatus.OK);
		//return read;
	}
}
