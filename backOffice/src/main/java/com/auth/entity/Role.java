package com.auth.entity;

import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="roles")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_Roles;
    private String nom;

    @ManyToMany
    @JoinTable(
        name = "role_permission",
        joinColumns = @JoinColumn(name = "Id_Roles"),
        inverseJoinColumns = @JoinColumn(name = "Id_Permission")
    )
    private Set <Permission> permissions;
}
