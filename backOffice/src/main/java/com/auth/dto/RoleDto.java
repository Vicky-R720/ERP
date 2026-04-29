package com.auth.dto;

import java.util.Set;

import lombok.Data;

@Data
public class RoleDto {

    private Integer idRoles;
    private String nom;
    private Set<PermissionDto> permissions;
}