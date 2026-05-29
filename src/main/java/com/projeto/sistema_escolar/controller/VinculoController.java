package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.service.VinculoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vinculos")
public class VinculoController {

    private final VinculoService vinculoService;

    public VinculoController(VinculoService vinculoService) {
        this.vinculoService = vinculoService;
    }

    @PostMapping
    public ResponseEntity<?> vincular(@RequestParam Long professorId,
                                      @RequestParam Long disciplinaId) {

        return ResponseEntity.ok(
                vinculoService.vincular(professorId, disciplinaId)
        );
    }

    @GetMapping("/professor/{id}")
    public ResponseEntity<?> disciplinasDoProfessor(@PathVariable Long id) {

        return ResponseEntity.ok(
                vinculoService.disciplinasDoProfessor(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirVinculo(@PathVariable Long id) {

        vinculoService.excluirVinculo(id);

        return ResponseEntity.ok("Vínculo removido com sucesso");
    }
}
