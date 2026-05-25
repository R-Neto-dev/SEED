package com.projeto.sistema_escolar.service;

import com.projeto.sistema_escolar.model.Escola;
import com.projeto.sistema_escolar.repository.EscolaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EscolaService {

    @Autowired
    private EscolaRepository escolaRepository;

    // cadastrar escola
    public Escola salvarEscola(Escola escola) {
        return escolaRepository.save(escola);
    }

    // listar escolas
    public List<Escola> listarEscolas() {
        return escolaRepository.findAll();
    }
}