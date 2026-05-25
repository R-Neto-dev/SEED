package com.projeto.sistema_escolar.repository;

import com.projeto.sistema_escolar.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
