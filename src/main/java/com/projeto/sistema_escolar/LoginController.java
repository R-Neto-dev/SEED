package com.projeto.sistema_escolar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/login")
    public ResponseEntity<?> logar(@RequestBody Map<String, String> dados) {
        LoginResponse response = service.autenticar(dados.get("email"), dados.get("senha"));
        if (response != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos!");
    }
}