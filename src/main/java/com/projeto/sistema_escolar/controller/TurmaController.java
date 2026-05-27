package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.model.Turma;
import com.projeto.sistema_escolar.model.Usuario;
import com.projeto.sistema_escolar.service.TurmaService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turmas")
@CrossOrigin("*")
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    // CRIAR TURMA
    @PostMapping
    public Turma criarTurma(@RequestBody Turma turma) {

        return turmaService.salvarTurma(turma);

    }

    // LISTAR TURMAS
    @GetMapping
    public List<Turma> listarTurmas() {

        return turmaService.listarTurmasDTO();

    }

    // BUSCAR TURMA POR ID
    @GetMapping("/{id}")
    public Optional<Turma> buscarTurmaPorId(@PathVariable Long id) {

        return turmaService.buscarTurmaDTO(id);

    }

    // ADICIONAR ALUNO NA TURMA
    @PostMapping("/{turmaId}/alunos")
    public Turma adicionarAluno(
            @PathVariable Long turmaId,
            @RequestBody Usuario aluno
    ) {

        return turmaService.adicionarAlunoNaTurma(turmaId, aluno);

    }

}