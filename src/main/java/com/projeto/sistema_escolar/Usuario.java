package com.projeto.sistema_escolar;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String email;

    @Column(name = "senha_hash") 
    private String senha;

    @Column(name = "perfil_id")
    private Integer perfilId;
}