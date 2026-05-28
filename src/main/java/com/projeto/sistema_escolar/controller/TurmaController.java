package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.model.Turma;
import com.projeto.sistema_escolar.service.TurmaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
@CrossOrigin(origins = "*")
public class TurmaController {

    private final TurmaService service;

    public TurmaController(TurmaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Turma> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscarPorId(
            @PathVariable Long id
    ) {

        return service.buscarTurmaDTO(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Turma criar(@RequestBody Turma turma) {
        return service.salvar(turma);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turma> atualizar(
            @PathVariable Long id,
            @RequestBody Turma turmaAtualizada
    ) {

        return service.buscarTurmaDTO(id)
                .map(turma -> {

                    turma.setNome(turmaAtualizada.getNome());

                    turma.setSerie(turmaAtualizada.getSerie());

                    return ResponseEntity.ok(
                            service.salvar(turma)
                    );

                }).orElse(ResponseEntity.notFound().build());
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(
            @PathVariable Long id
    ) {

        if (service.existePorId(id)) {

            service.deletar(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}