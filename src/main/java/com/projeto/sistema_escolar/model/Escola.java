package com.projeto.sistema_escolar.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "escolas")
@Data
public class Escola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String endereco;

    private String telefone;

    private String email;
}