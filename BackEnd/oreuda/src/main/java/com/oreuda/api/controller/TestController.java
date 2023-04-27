package com.oreuda.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@GetMapping("/api/v1/business-service")
	public String springCloudService() {
		return "business-service 호출!";
	}

	@GetMapping("/api/v1/test")
	public String test() {
		return "test 호출!";
	}
}
