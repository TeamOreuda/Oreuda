package com.oreuda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = "com.oreuda.api.client")
@SpringBootApplication
public class OreudaDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaDataApplication.class, args);
	}

}
