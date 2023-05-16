package com.oreuda.oreuda_plant.api.Controller;

import com.oreuda.oreuda_plant.api.Domain.Dto.PlantDto;
import com.oreuda.oreuda_plant.api.Domain.Dto.StatusDto;
import com.oreuda.oreuda_plant.api.Service.CardService;
import com.oreuda.oreuda_plant.api.Service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/plant")
public class PlantController {
    private final PlantService plantService;
    private final CardService cardService;

    @GetMapping()
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getPlant(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        PlantDto plantDto = plantService.getPlant(userId);
        return ResponseEntity.ok().body(Objects.requireNonNullElse(plantDto, "null"));
    }

    @PostMapping()
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> setPlantStatus(@RequestHeader String userId) {
        plantService.setStatus(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/info")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getPlantInfo(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        Map<?, ?> info = plantService.getInfo(userId);
        return ResponseEntity.ok().body(info);
    }

    @GetMapping("/graph")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getGraph(@RequestHeader HttpHeaders headers) {
        String userId = headers.getFirst("userId");
        List<StatusDto> statusDtoList = plantService.getStatus(userId);
        return ResponseEntity.ok().body(statusDtoList);
    }

    @GetMapping("/card")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getCard(@RequestParam String nickname) throws IOException {
        String userId = plantService.getUserId(nickname);
        PlantDto plantDto = plantService.getPlant(userId);
        String svg = cardService.getCard(userId, plantDto);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("image/svg+xml"))
                .cacheControl(CacheControl.maxAge(Duration.ofHours(1)))
                .body(svg);
    }
}
