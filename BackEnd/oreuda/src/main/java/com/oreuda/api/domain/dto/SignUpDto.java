package com.oreuda.api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SignUpDto {

	String userId;
	String nickname;
	String image;
}
