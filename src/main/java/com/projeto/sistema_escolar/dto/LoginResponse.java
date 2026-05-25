package com.projeto.sistema_escolar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor // <-- Cria o construtor com os 3 campos automaticamente!
@NoArgsConstructor  // <-- Cria o construtor vazio obrigatório
public class LoginResponse {
    private String nome;
    private String cargo;
    private String mensagem;
}