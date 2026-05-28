package com.projeto.sistema_escolar.controller;

import com.projeto.sistema_escolar.model.Turma;
import com.projeto.sistema_escolar.model.Usuario;
import com.projeto.sistema_escolar.service.TurmaService;
import com.projeto.sistema_escolar.service.UsuarioService;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;

    private final TurmaService turmaService;

    public UsuarioController(
            UsuarioService service,
            TurmaService turmaService
    ) {
        this.service = service;
        this.turmaService = turmaService;
    }

    @GetMapping
    public List<Usuario> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {

        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {

        return service.salvar(usuario);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(
            @PathVariable Long id,
            @RequestBody Usuario usuarioAtualizado
    ) {

        return service.buscarPorId(id).map(usuario -> {

            usuario.setNome(usuarioAtualizado.getNome());

            usuario.setEmail(usuarioAtualizado.getEmail());

            usuario.setSenha(usuarioAtualizado.getSenha());

            usuario.setPerfilId(usuarioAtualizado.getPerfilId());

            return ResponseEntity.ok(service.salvar(usuario));

        }).orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{usuarioId}/turma/{turmaId}")
    public ResponseEntity<Usuario> adicionarNaTurma(
            @PathVariable Long usuarioId,
            @PathVariable Long turmaId
    ) {

        Optional<Usuario> usuarioOpt =
                service.buscarPorId(usuarioId);

        if (usuarioOpt.isEmpty()) {

            return ResponseEntity.notFound().build();
        }

        Optional<Turma> turmaOpt =
                turmaService.buscarTurmaDTO(turmaId);

        if (turmaOpt.isEmpty()) {

            return ResponseEntity.notFound().build();
        }

        Usuario usuario = usuarioOpt.get();

        Turma turma = turmaOpt.get();

        usuario.setTurma(turma);

        Usuario usuarioSalvo = service.salvar(usuario);

        return ResponseEntity.ok(usuarioSalvo);
    }


    @PutMapping("/{usuarioId}/remover-turma")
    public ResponseEntity<Usuario> removerDaTurma(
            @PathVariable Long usuarioId
    ) {

        Optional<Usuario> usuarioOpt =
                service.buscarPorId(usuarioId);

        if (usuarioOpt.isEmpty()) {

            return ResponseEntity.notFound().build();
        }

        Usuario usuario = usuarioOpt.get();

        usuario.setTurma(null);

        Usuario usuarioSalvo = service.salvar(usuario);

        return ResponseEntity.ok(usuarioSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        if (service.existePorId(id)) {

            service.deletar(id);

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma;
}