package com.projeto.sistema_escolar.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.sistema_escolar.model.Usuario;
import com.projeto.sistema_escolar.repository.UsuarioRepository;
import com.projeto.sistema_escolar.dto.CadastroRequest;
import com.projeto.sistema_escolar.dto.LoginResponse;

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

    public String cadastrar(CadastroRequest dados) {
        if (repository.existsByEmail(dados.getEmail())) {
            return "Erro: E-mail já cadastrado!";
        }
        
        repository.cadastrarUsuarioNative(
            dados.getNome(), 
            dados.getEmail(), 
            dados.getSenha(), 
            dados.getPerfilId()
        );
        
        return "Cadastro realizado com sucesso!";
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    public boolean existePorId(Long id) {
        return repository.existsById(id);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
