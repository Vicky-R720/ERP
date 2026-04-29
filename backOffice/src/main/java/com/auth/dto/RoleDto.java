package com.auth.dto;

import java.util.Set;

import lombok.Data;

@Data
public class RoleDto {

    private Long idRoles;
    private String nom;
    private Set<PermissionDto> permissions;
}