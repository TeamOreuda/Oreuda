package com.oreuda.oreuda_auth.api.domain.dto;

import com.oreuda.oreuda_auth.api.domain.entity.Auth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthDto {
    private String authId;

    private String code;

    private LocalDateTime registrationDate;

    public Auth toAuth(AuthDto authDto) {
        return Auth.builder()
                .code(authDto.getCode())
                .registrationDate(authDto.getRegistrationDate())
                .build();
    }
}
