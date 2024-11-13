package com.empresa.Escalas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "funcionarios")
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Funcionarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String endereco;
    private String telefone;
    private String cargo;
    private String email;
    private Boolean ativo;

    @ManyToOne
    @JoinColumn(name = "id_caminhoes")
    private Caminhoes caminhoes;

    @ManyToOne
    @JoinColumn(name = "id_escalas")
    private Escala escalas;

    @OneToMany(mappedBy = "funcionario")
    @JsonIgnore
    private List<User> users;

    public Funcionarios(String nome, String cpf, String endereco, String telefone, String cargo, String email, boolean ativo, String idCaminhoes, String idEscalas) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cargo = cargo;
        this.email = email;
        this.ativo = ativo;

        if (idCaminhoes != null && !idCaminhoes.isEmpty()) {
            try {
                this.caminhoes = new Caminhoes(Long.parseLong(idCaminhoes));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("ID de Caminhoes inválido, não foi possível converter para Long.");
            }
        }

        if (idEscalas != null && !idEscalas.isEmpty()) {
            try {
                this.escalas = new Escala(Long.parseLong(idEscalas));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("ID de Escala inválido, não foi possível converter para Long.");
            }
        }
    }

    public Funcionarios() {
    }

    public Funcionarios(Long id, String nome, String cpf, String endereco, String telefone, String cargo, String email, Boolean ativo, Caminhoes caminhoes, Escala escalas) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cargo = cargo;
        this.email = email;
        this.ativo = ativo;
        this.caminhoes = caminhoes;
        this.escalas = escalas;
    }
}
