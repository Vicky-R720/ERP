package com.auth.service;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.auth.dto.LoginRequestDto;
import com.auth.dto.RegisterRequestDto;
import com.auth.entity.Role;
import com.auth.entity.Utilisateur;
import com.auth.repository.RoleRepository;
import com.auth.repository.UtilisateurRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

    private static final String DEFAULT_ROLE_NAME = "USER";

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public Utilisateur login(LoginRequestDto request) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (Boolean.FALSE.equals(utilisateur.getEnabled())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User account is disabled");
        }

        if (!passwordEncoder.matches(request.getPassword(), utilisateur.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return utilisateur;
    }

    public Utilisateur register(RegisterRequestDto request) {
        utilisateurRepository.findByEmail(request.getEmail())
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
                });

        Role defaultRole = roleRepository.findByNom(DEFAULT_ROLE_NAME)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setNom(DEFAULT_ROLE_NAME);
                    role.setPermissions(Collections.emptySet());
                    return roleRepository.save(role);
                });

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom(request.getNom());
        utilisateur.setEmail(request.getEmail());
        utilisateur.setPassword(passwordEncoder.encode(request.getPassword()));
        utilisateur.setEnabled(true);
        utilisateur.setRoles(Collections.singleton(defaultRole));

        return utilisateurRepository.save(utilisateur);
    }
}