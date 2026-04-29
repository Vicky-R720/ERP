package com.auth.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth.entity.Permission;
import com.auth.entity.Role;
import com.auth.entity.Utilisateur;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long expirationMillis;

    public JwtService(@Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expirationMillis) {
        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(secret);
        } catch (IllegalArgumentException ex) {
            keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        }

        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMillis = expirationMillis;
    }

    public String generateToken(Utilisateur utilisateur) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
                .subject(utilisateur.getEmail())
                .claim("roles", extractRoleNames(utilisateur.getRoles()))
                .claim("permissions", extractPermissionNames(utilisateur.getRoles()))
                .issuedAt(new Date(now))
                .expiration(new Date(now + expirationMillis))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, String username) {
        Claims claims = parseClaims(token);
        return username.equals(claims.getSubject()) && claims.getExpiration().after(new Date());
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Set<String> extractRoleNames(Set<Role> roles) {
        if (roles == null) {
            return Set.of();
        }

        return roles.stream()
                .map(Role::getNom)
                .collect(Collectors.toSet());
    }

    private Set<String> extractPermissionNames(Set<Role> roles) {
        if (roles == null) {
            return Set.of();
        }

        return roles.stream()
                .flatMap(role -> role.getPermissions() == null ? Set.<Permission>of().stream() : role.getPermissions().stream())
                .map(Permission::getNom)
                .collect(Collectors.toSet());
    }
}