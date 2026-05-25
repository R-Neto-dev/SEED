package com.projeto.sistema_escolar.repository;

import com.projeto.sistema_escolar.model.Escola;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EscolaRepository extends JpaRepository<Escola, Long> {

}