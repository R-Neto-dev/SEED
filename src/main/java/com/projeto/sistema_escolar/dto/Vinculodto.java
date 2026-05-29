package com.projeto.sistema_escolar.dto;

public class Vinculodto {

    private Long id;

    private Long professorId;
    private String professorNome;
    private Long disciplinaId;
    private String disciplinaNome;

    public Vinculodto() {
    }
 
    public Vinculodto(Long id, Long professorId, String professorNome,
                      Long disciplinaId, String disciplinaNome) {
        this.id = id;
        this.professorId = professorId;
        this.professorNome = professorNome;
        this.disciplinaId = disciplinaId;
        this.disciplinaNome = disciplinaNome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    public String getProfessorNome() {
        return professorNome;
    }

    public void setProfessorNome(String professorNome) {
        this.professorNome = professorNome;
    }

    public Long getDisciplinaId() {
        return disciplinaId;
    }

    public void setDisciplinaId(Long disciplinaId) {
        this.disciplinaId = disciplinaId;
    }

    public String getDisciplinaNome() {
        return disciplinaNome;
    }

    public void setDisciplinaNome(String disciplinaNome) {
        this.disciplinaNome = disciplinaNome;
    }
}