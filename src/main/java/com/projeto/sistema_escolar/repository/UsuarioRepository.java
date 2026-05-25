package com.projeto.sistema_escolar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.sistema_escolar.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    boolean existsByEmail(String email);

    // COMANDO SQL PURO PARA CADASTRAR
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO usuarios (nome, email, senha_hash, perfil_id) VALUES (:nome, :email, :senha, :perfil)", nativeQuery = true)
    void cadastrarUsuarioNative(@Param("nome") String nome, 
                                @Param("email") String email, 
                                @Param("senha") String senha, 
                                @Param("perfil") Integer perfil);
}