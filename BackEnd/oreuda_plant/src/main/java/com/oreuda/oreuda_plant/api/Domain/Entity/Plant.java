package com.oreuda.oreuda_plant.api.Domain.Entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Plant {

    // 기본키
    @Id
    @GeneratedValue
    @Column(name = "plant_id")
    private Long id;

    // 식물 이름
    @NotNull
    @Column(name = "plant_name")
    private String name;

    // 식물 기준 최소값
    @NotNull
    @Column(name = "plant_min")
    private int min;

    // 식물 기준 최대값
    @NotNull
    @Column(name = "plant_max")
    private int max;
}
