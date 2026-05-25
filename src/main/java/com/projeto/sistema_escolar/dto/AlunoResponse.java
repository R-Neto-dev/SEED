package com.projeto.sistema_escolar.dto;

import lombok.Data;

@Data
public class AlunoResponse {
    private Long id;
    private String nome;
    private Integer idade;
}