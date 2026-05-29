package com.projeto.sistema_escolar.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Professor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL)
    private List<Vinculo> vinculos;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<Vinculo> getVinculos() { return vinculos; }
    public void setVinculos(List<Vinculo> vinculos) { this.vinculos = vinculos; }
}