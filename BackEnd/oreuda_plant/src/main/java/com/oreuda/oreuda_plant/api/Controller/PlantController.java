package com.oreuda.oreuda_plant.api.Controller;

import com.oreuda.oreuda_plant.api.Domain.Dto.PlantDto;
import com.oreuda.oreuda_plant.api.Domain.Dto.StatusDto;
import com.oreuda.oreuda_plant.api.Service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Objects;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/plant")
public class PlantController {
    private final PlantService plantService;

    @GetMapping()
    public ResponseEntity<?> getPlant(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        PlantDto plantDto = plantService.getPlant(userId);
        return ResponseEntity.ok().body(Objects.requireNonNullElse(plantDto, "null"));
    }

    @PostMapping()
    public ResponseEntity<?> postPlant(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        return ResponseEntity.ok().body(userId);
    }

    @GetMapping("/graph")
    public ResponseEntity<?> getGraph(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        List<StatusDto> statusDtoList = plantService.getStatus(userId);
        return ResponseEntity.ok().body(statusDtoList);
    }

    @GetMapping("/card")
    public String getCard(@RequestHeader HttpHeaders headers) {
        return "card";
    }
}
