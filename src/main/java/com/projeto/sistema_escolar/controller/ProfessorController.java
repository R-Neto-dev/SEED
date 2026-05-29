package com.projeto.sistema_escolar.controller;
import com.projeto.sistema_escolar.model.Professor;
import com.projeto.sistema_escolar.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository repository;

    @PostMapping
    public Professor salvar(@RequestBody Professor professor) {
        return repository.save(professor);
    }

    @GetMapping
    public List<Professor> listar() {
        return repository.findAll();
    }
}