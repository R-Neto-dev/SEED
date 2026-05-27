package com.projeto.sistema_escolar.service;

import com.projeto.sistema_escolar.model.Turma;
import com.projeto.sistema_escolar.model.Usuario;
import com.projeto.sistema_escolar.repository.TurmaRepository;
import com.projeto.sistema_escolar.repository.UsuarioRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;
    private final UsuarioRepository usuarioRepository;

    public TurmaService(
            TurmaRepository turmaRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.turmaRepository = turmaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // SALVAR TURMA
    public Turma salvarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    // LISTAR TURMAS
    public List<Turma> listarTurmasDTO() {
        return turmaRepository.findAll();
    }

    // BUSCAR TURMA POR ID
    public Optional<Turma> buscarTurmaDTO(Long id) {
        return turmaRepository.findById(id);
    }

    // ADICIONAR ALUNO NA TURMA
    public Turma adicionarAlunoNaTurma(Long turmaId, Usuario aluno) {

        Optional<Turma> turmaOpt = turmaRepository.findById(turmaId);

        if (turmaOpt.isEmpty()) {
            return null;
        }

        Turma turma = turmaOpt.get();

        aluno.setTurma(turma);

        usuarioRepository.save(aluno);

        return turma;
    }
}