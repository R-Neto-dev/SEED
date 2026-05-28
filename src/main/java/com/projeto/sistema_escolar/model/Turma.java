package com.projeto.sistema_escolar.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "turmas")
@Data
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String serie;

    @OneToMany(mappedBy = "turma")
    @JsonIgnoreProperties("turma")
    private List<Usuario> alunos;
}