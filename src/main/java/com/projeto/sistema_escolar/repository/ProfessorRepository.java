package com.projeto.sistema_escolar.repository;
import com.projeto.sistema_escolar.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {}