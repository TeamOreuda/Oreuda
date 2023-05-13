package com.oreuda.api.domain.dto;

import com.oreuda.api.domain.entity.readme.Techstack;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TechstackDto {

	String name;
	String color;
	int index;

	public static TechstackDto toEntity(Techstack techStack){
		return TechstackDto.builder()
			.name(techStack.getName())
			.index(techStack.getIndex())
			.color(techStack.getColor())
			.build();
	}

}
