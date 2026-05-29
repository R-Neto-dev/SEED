package com.projeto.sistema_escolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.projeto.sistema_escolar.model.Disciplina;
import com.projeto.sistema_escolar.model.Professor;
import com.projeto.sistema_escolar.model.Vinculo;

public interface VinculoRepository extends JpaRepository<Vinculo, Long> {

    List<Vinculo> findByProfessor(Professor professor);

    List<Vinculo> findByDisciplina(Disciplina disciplina);
}