package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.model.Escola;
import com.projeto.sistema_escolar.service.EscolaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/escolas")
@CrossOrigin("*")
public class EscolaController {

    @Autowired
    private EscolaService escolaService;

    @PostMapping
    public Escola cadastrarEscola(@RequestBody Escola escola) {

        try {

            System.out.println("CHEGOU NO POST");
            System.out.println(escola);

            return escolaService.salvarEscola(escola);

        } catch (Exception e) {

            e.printStackTrace();

            throw e;
        }
    }

    @GetMapping
    public List<Escola> listarEscolas() {
        return escolaService.listarEscolas();
    }
}