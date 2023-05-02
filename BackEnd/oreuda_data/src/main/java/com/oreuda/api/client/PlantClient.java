package com.oreuda.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "plant-client", url = "http://localhost:8060/api/v1/plant")
public interface PlantClient {

	@PostMapping(produces = "application/json")
	ResponseEntity<?> notifyCompletion(@RequestHeader String userId);
}
