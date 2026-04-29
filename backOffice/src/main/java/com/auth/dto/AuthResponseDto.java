package com.auth.dto;

import lombok.Data;

@Data
public class AuthResponseDto {

    private String token;
    private String tokenType = "Bearer";
    private UtilisateurDto user;
}