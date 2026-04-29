package com.auth.security;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth.entity.Permission;
import com.auth.entity.Role;
import com.auth.entity.Utilisateur;
import com.auth.repository.UtilisateurRepository;
import com.auth.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UtilisateurRepository utilisateurRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ") || SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            String username = jwtService.extractUsername(token);

            if (username != null && jwtService.isTokenValid(token, username)) {
                utilisateurRepository.findByEmail(username).ifPresent(utilisateur -> {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            utilisateur.getEmail(), null, toAuthorities(utilisateur.getRoles()));
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                });
            }
        } catch (Exception ignored) {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private Collection<SimpleGrantedAuthority> toAuthorities(Set<Role> roles) {
        if (roles == null) {
            return Collections.emptyList();
        }

        return roles.stream()
                .flatMap(role -> {
                    var roleAuthorities = java.util.stream.Stream.of(new SimpleGrantedAuthority("ROLE_" + role.getNom()));
                    var permissionAuthorities = role.getPermissions() == null
                            ? java.util.stream.Stream.<SimpleGrantedAuthority>empty()
                            : role.getPermissions().stream()
                                    .map(Permission::getNom)
                                    .map(permissionName -> new SimpleGrantedAuthority("PERM_" + permissionName));
                    return java.util.stream.Stream.concat(roleAuthorities, permissionAuthorities);
                })
                .collect(Collectors.toSet());
    }
}