package com.projeto.sistema_escolar.service;

import com.projeto.sistema_escolar.dto.AlunoResponse;
import com.projeto.sistema_escolar.dto.TurmaResponse;
import com.projeto.sistema_escolar.model.Aluno;
import com.projeto.sistema_escolar.model.Turma;
import com.projeto.sistema_escolar.repository.AlunoRepository;
import com.projeto.sistema_escolar.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    // =========================
    // CREATE TURMA
    // =========================
    public Turma salvarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    // =========================
    // LISTAR TURMAS (SEM ALUNOS - MAIS LIMPO)
    // =========================
    public List<TurmaResponse> listarTurmasDTO() {

        return turmaRepository.findAll()
                .stream()
                .map(this::toDTOWithoutAlunos)
                .toList();
    }

    // =========================
    // BUSCAR TURMA POR ID (COM ALUNOS)
    // =========================
    public TurmaResponse buscarTurmaDTO(Long id) {

        Turma turma = turmaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        return toDTOWithAlunos(turma);
    }

    // =========================
    // ENTITY INTERNA
    // =========================
    public Turma buscarPorId(Long id) {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));
    }

    // =========================
    // ADD ALUNO
    // =========================
    public Aluno adicionarAlunoNaTurma(Long turmaId, Aluno aluno) {

        Turma turma = turmaRepository.findById(turmaId)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        aluno.setTurma(turma);

        return alunoRepository.save(aluno);
    }

    // =========================
    // DTO SEM ALUNOS (LISTA TURMAS)
    // =========================
    private TurmaResponse toDTOWithoutAlunos(Turma turma) {

        TurmaResponse dto = new TurmaResponse();
        dto.setId(turma.getId());
        dto.setNome(turma.getNome());
        dto.setSerie(turma.getSerie());

        dto.setAlunos(List.of()); // vazio mesmo

        return dto;
    }

    // =========================
    // DTO COM ALUNOS (DETALHE)
    // =========================
    private TurmaResponse toDTOWithAlunos(Turma turma) {

        TurmaResponse dto = new TurmaResponse();
        dto.setId(turma.getId());
        dto.setNome(turma.getNome());
        dto.setSerie(turma.getSerie());

        List<AlunoResponse> alunos = turma.getAlunos()
                .stream()
                .map(a -> {
                    AlunoResponse ar = new AlunoResponse();
                    ar.setId(a.getId());
                    ar.setNome(a.getNome());
                    ar.setIdade(a.getIdade());
                    return ar;
                })
                .toList();

        dto.setAlunos(alunos);

        return dto;
    }
}