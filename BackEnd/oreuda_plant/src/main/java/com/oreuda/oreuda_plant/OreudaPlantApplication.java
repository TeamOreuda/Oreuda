package com.oreuda.oreuda_plant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class OreudaPlantApplication {

	public static void main(String[] args) {
		SpringApplication.run(OreudaPlantApplication.class, args);
	}

}
