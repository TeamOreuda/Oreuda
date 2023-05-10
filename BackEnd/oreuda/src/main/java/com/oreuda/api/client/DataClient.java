package com.oreuda.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "data-client", url = "http://172.28.0.24:8050/api/v1/data")
public interface DataClient {

    @RequestMapping(method = RequestMethod.PATCH)
    ResponseEntity<?> setData(@RequestHeader String userId);
}
