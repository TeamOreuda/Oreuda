package com.oreuda.oreuda_plant.Controller;

import com.oreuda.oreuda_plant.Service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/plant")
public class PlantController {
    private final PlantService plantService;

    @GetMapping()
    public ResponseEntity<?> getPlant(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        return ResponseEntity.ok().body(userId);
    }

    @GetMapping("/graph")
    public String getGraph(@RequestHeader HttpHeaders headers) {
        return "graph";
    }

    @GetMapping("/card")
    public String getCard(@RequestHeader HttpHeaders headers) {
        return "card";
    }
}
