package com.oreuda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = "com.oreuda.api.client")
@EnableEurekaClient
@SpringBootApplication
public class OreudaApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaApplication.class, args);
	}

}
