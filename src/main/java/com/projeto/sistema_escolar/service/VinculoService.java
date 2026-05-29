package com.projeto.sistema_escolar.service;

import com.projeto.sistema_escolar.dto.Vinculodto;
import com.projeto.sistema_escolar.model.*;
import com.projeto.sistema_escolar.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VinculoService {

    private final VinculoRepository vinculoRepo;
    private final ProfessorRepository professorRepo;
    private final DisciplinaRepository disciplinaRepo;

    public VinculoService(VinculoRepository vinculoRepo,
                          ProfessorRepository professorRepo,
                          DisciplinaRepository disciplinaRepo) {
        this.vinculoRepo = vinculoRepo;
        this.professorRepo = professorRepo;
        this.disciplinaRepo = disciplinaRepo;
    }

    public Vinculodto vincular(Long professorId, Long disciplinaId) {

        Professor professor = professorRepo.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        Disciplina disciplina = disciplinaRepo.findById(disciplinaId)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));

        Vinculo vinculo = new Vinculo();
        vinculo.setProfessor(professor);
        vinculo.setDisciplina(disciplina);

        Vinculo salvo = vinculoRepo.save(vinculo);

        return converterParaDTO(salvo);
    }

    public List<Vinculodto> disciplinasDoProfessor(Long professorId) {

        Professor professor = professorRepo.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        return vinculoRepo.findByProfessor(professor)
                .stream()
                .map(this::converterParaDTO)
                .toList();
    }
private Vinculodto converterParaDTO(Vinculo vinculo) {

    Vinculodto dto = new Vinculodto();

    dto.setId(vinculo.getId());

    dto.setProfessorId(vinculo.getProfessor().getId());
    dto.setProfessorNome(vinculo.getProfessor().getNome());

    dto.setDisciplinaId(vinculo.getDisciplina().getId());
    dto.setDisciplinaNome(vinculo.getDisciplina().getNome());

    return dto;
}

    public void excluirVinculo(Long vinculoId) {

        if (!vinculoRepo.existsById(vinculoId)) {
            throw new RuntimeException("Vínculo não encontrado");
        }

        vinculoRepo.deleteById(vinculoId);
    }
}