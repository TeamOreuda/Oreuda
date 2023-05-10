package com.oreuda.oreuda_plant.api.Controller;

import com.oreuda.oreuda_plant.api.Domain.Dto.PlantDto;
import com.oreuda.oreuda_plant.api.Domain.Dto.StatusDto;
import com.oreuda.oreuda_plant.api.Service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/plant")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PlantController {
    private final PlantService plantService;

    @GetMapping()
    public ResponseEntity<?> getPlant(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        PlantDto plantDto = plantService.getPlant(userId);
        return ResponseEntity.ok().body(Objects.requireNonNullElse(plantDto, "null"));
    }

    @PostMapping()
    public ResponseEntity<?> setPlantStatus(@RequestHeader String userId) {
        plantService.setStatus(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/graph")
    public ResponseEntity<?> getGraph(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        List<StatusDto> statusDtoList = plantService.getStatus(userId);
        return ResponseEntity.ok().body(statusDtoList);
    }

    @GetMapping("/card")
    public ResponseEntity<?> getCard(@RequestHeader HttpHeaders headers) {
        log.info("getCard");
        String svg =
                "<svg width=\"100\" height=\"100\">\n" +
                "  <circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"green\" stroke-width=\"4\" fill=\"yellow\" />\n" +
                "</svg>";
        return ResponseEntity.ok().body(svg);
    }
}
