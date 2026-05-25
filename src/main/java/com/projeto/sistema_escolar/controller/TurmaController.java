package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.dto.TurmaResponse;
import com.projeto.sistema_escolar.model.Aluno;
import com.projeto.sistema_escolar.model.Turma;
import com.projeto.sistema_escolar.service.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
@CrossOrigin("*")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    // CREATE TURMA
    @PostMapping
    public Turma criarTurma(@RequestBody Turma turma) {
        return turmaService.salvarTurma(turma);
    }

    // LISTAR TURMAS (DTO - SEM LOOP)
    @GetMapping
    public List<TurmaResponse> listarTurmas() {
        return turmaService.listarTurmasDTO();
    }

    // BUSCAR TURMA POR ID (DTO)
    @GetMapping("/{id}")
    public TurmaResponse buscarTurmaPorId(@PathVariable Long id) {
        return turmaService.buscarTurmaDTO(id);
    }

    // ADD ALUNO
    @PostMapping("/{turmaId}/alunos")
    public Aluno adicionarAluno(
            @PathVariable Long turmaId,
            @RequestBody Aluno aluno
    ) {
        return turmaService.adicionarAlunoNaTurma(turmaId, aluno);
    }
}