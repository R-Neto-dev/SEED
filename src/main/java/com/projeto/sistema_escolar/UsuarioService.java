package com.projeto.sistema_escolar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    // A lógica que estava no Controller vem para cá
    public LoginResponse autenticar(String email, String senha) {
        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario user = usuarioOpt.get();
            if (user.getSenha().equals(senha)) {
                // Se estiver tudo certo, cria o "recibo" de sucesso
                return new LoginResponse(user.getNome(), user.getCargo(), "Login realizado com sucesso!");
            }
        }
        // Se algo der errado, retorna nulo (ou você pode lançar um erro)
        return null;
    }
}