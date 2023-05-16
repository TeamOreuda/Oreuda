package com.oreuda.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OutputRepositoryDto {

	// 고유 ID
	String id;

	// 이름
	String name;
}
