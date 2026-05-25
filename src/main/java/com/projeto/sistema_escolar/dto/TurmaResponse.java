package com.projeto.sistema_escolar.dto;

import lombok.Data;

import java.util.List;

@Data
public class TurmaResponse {
    private Long id;
    private String nome;
    private String serie;
    private List<AlunoResponse> alunos;
}