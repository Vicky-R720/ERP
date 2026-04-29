package com.auth.entity;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "permission")
@Data
public class Permission {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPermission;
    private String Nom;
}
