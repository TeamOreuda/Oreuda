package com.oreuda.oreuda_plant.api.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatusDto {
    Long id;
    Integer val;
    LocalDateTime time;
}
