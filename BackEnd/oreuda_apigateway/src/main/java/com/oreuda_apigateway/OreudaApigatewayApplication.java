package com.oreuda_apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class OreudaApigatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaApigatewayApplication.class, args);
	}

}
