package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.model.Escola;
import com.projeto.sistema_escolar.service.EscolaService;

//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/escolas")
@CrossOrigin("*")
public class EscolaController {

    private final EscolaService escolaService;

    public EscolaController(EscolaService escolaService) {
        this.escolaService = escolaService;
    }

    // CADASTRAR ESCOLA
    //@PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping
    public Escola cadastrar(@RequestBody Escola escola) {
        return escolaService.cadastrar(escola);
    }

    // LISTAR ESCOLAS
    @GetMapping
    public List<Escola> listar() {
        return escolaService.listarTodas();
    }
}