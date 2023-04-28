package com.oreuda.oreuda_auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class OreudaAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaAuthApplication.class, args);
	}

}
