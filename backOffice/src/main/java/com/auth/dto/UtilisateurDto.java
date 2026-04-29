package com.auth.dto;

import java.util.Set;

import lombok.Data;

@Data
public class UtilisateurDto {

    private Long idUtilisateur;
    private String nom;
    private String email;
    private String password;
    private Boolean enabled;
    private Set<RoleDto> roles;
}