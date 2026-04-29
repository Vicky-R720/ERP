package com.auth.controller;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.dto.PermissionDto;
import com.auth.dto.AuthResponseDto;
import com.auth.dto.LoginRequestDto;
import com.auth.dto.RegisterRequestDto;
import com.auth.dto.RoleDto;
import com.auth.dto.UtilisateurDto;
import com.auth.entity.Permission;
import com.auth.entity.Role;
import com.auth.entity.Utilisateur;
import com.auth.service.AuthService;
import com.auth.service.JwtService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        Utilisateur utilisateur = authService.login(request);
        return ResponseEntity.ok(toAuthResponse(utilisateur));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto request) {
        Utilisateur utilisateur = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(toAuthResponse(utilisateur));
    }

    private AuthResponseDto toAuthResponse(Utilisateur utilisateur) {
        AuthResponseDto response = new AuthResponseDto();
        response.setToken(jwtService.generateToken(utilisateur));
        response.setUser(toDto(utilisateur));
        return response;
    }

    private UtilisateurDto toDto(Utilisateur utilisateur) {
        UtilisateurDto dto = new UtilisateurDto();
        dto.setIdUtilisateur(utilisateur.getIdUtilisateur());
        dto.setNom(utilisateur.getNom());
        dto.setEmail(utilisateur.getEmail());
        dto.setPassword(null);
        dto.setEnabled(utilisateur.getEnabled());
        dto.setRoles(toRoleDtos(utilisateur.getRoles()));
        return dto;
    }

    private Set<RoleDto> toRoleDtos(Set<Role> roles) {
        if (roles == null) {
            return Collections.emptySet();
        }

        return roles.stream()
                .map(role -> {
                    RoleDto dto = new RoleDto();
                    dto.setIdRoles(role.getId_Roles());
                    dto.setNom(role.getNom());
                    dto.setPermissions(toPermissionDtos(role.getPermissions()));
                    return dto;
                })
                .collect(Collectors.toSet());
    }

    private Set<PermissionDto> toPermissionDtos(Set<Permission> permissions) {
        if (permissions == null) {
            return Collections.emptySet();
        }

        return permissions.stream()
                .map(permission -> {
                    PermissionDto dto = new PermissionDto();
                    dto.setIdPermission(permission.getIdPermission());
                    dto.setNom(permission.getNom());
                    return dto;
                })
                .collect(Collectors.toSet());
    }
}