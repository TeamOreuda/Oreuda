package com.oreuda.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "plant-client", url = "http://localhost:8060/api/v1/plant")
public interface PlantClient {

	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<?> notifyCompletion(@RequestHeader String userId);
}
