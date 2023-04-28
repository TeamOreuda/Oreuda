package com.oreuda.oreuda_auth.client;

import com.oreuda.oreuda_auth.domain.dto.UserDto;
import com.oreuda.oreuda_auth.model.BaseResponseBody;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-client", url = "http://localhost:8080/api/v1/users")
public interface UserClient {

    @PostMapping(produces = "application/json")
    ResponseEntity<? extends BaseResponseBody> insertUser(@RequestBody UserDto userDto);
}
