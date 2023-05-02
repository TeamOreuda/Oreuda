package com.oreuda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class OreudaApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaApplication.class, args);
	}

}
