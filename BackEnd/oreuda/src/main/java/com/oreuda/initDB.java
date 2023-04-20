package com.oreuda;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import com.oreuda.api.service.InitService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class initDB {

	private final InitService initService;

	@PostConstruct
	public void init(){
		initService.initPlant();
	}
}
