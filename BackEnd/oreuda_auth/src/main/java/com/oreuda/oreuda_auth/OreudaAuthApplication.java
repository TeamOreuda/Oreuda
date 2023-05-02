package com.oreuda.oreuda_auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableEurekaClient
@EnableFeignClients(basePackages = "com.oreuda.oreuda_auth.api.client")
@SpringBootApplication
public class OreudaAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaAuthApplication.class, args);
	}

}
