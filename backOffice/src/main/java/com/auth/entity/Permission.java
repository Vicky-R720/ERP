package com.auth.entity;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "Permission")
@Data
public class Permission {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String Id_Permission;
    private String Nom;
}
