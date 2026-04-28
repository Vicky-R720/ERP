package com.auth.entity;

import java.util.Set;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "utilisateur")
@Data
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IdUtilisateur;

    private String nom;
    private String email;
    private String password;
    private Boolean enabled;

    @ManyToMany
    @JoinTable(
        name = "utilisateur_roles",
        joinColumns = @JoinColumn(name="Id_Utilistateur"),
        inverseJoinColumns = @JoinColumn(name = "id_role")
    )
    private Set <Role> roles;
}
