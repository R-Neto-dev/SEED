package com.projeto.sistema_escolar.service;

import com.projeto.sistema_escolar.model.Escola;
import com.projeto.sistema_escolar.repository.EscolaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EscolaService {

    private final EscolaRepository escolaRepository;

    public EscolaService(EscolaRepository escolaRepository) {
        this.escolaRepository = escolaRepository;
    }

    public Escola cadastrar(Escola escola) {
        return escolaRepository.save(escola);
    }

    // LISTAR ESCOLAS
    public List<Escola> listarTodas() {
        return escolaRepository.findAll();
    }
}