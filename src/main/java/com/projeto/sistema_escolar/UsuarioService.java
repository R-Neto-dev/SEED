package com.projeto.sistema_escolar;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public LoginResponse autenticar(String email, String senha) {
        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario user = usuarioOpt.get();
            if (user.getSenha().equals(senha)) {
                String cargoNome = "ALUNO";
                if (user.getPerfilId() != null) {
                    switch (user.getPerfilId()) {
                        case 1: cargoNome = "ADMIN"; break;
                        case 2: cargoNome = "COORDENADOR"; break;
                        case 3: cargoNome = "PROFESSOR"; break;
                        case 4: cargoNome = "ALUNO"; break;
                    }
                }
                return new LoginResponse(user.getNome(), cargoNome, "Login realizado com sucesso!");
            }
        }
        return null;
    }

    // Dentro do método cadastrar no UsuarioService.java, troque o final por:
    public String cadastrar(CadastroRequest dados) {
        if (repository.existsByEmail(dados.getEmail())) {
            return "Erro: E-mail já cadastrado!";
        }
        
        // Chama o SQL direto que criamos acima
        repository.cadastrarUsuarioNative(
            dados.getNome(), 
            dados.getEmail(), 
            dados.getSenha(), 
            dados.getPerfilId()
        );
        
        return "Cadastro realizado com sucesso!";
    }
}