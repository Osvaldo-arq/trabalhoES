package com.empresa.Escalas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "caminhoes")
@Data
@Setter
@Getter
@NoArgsConstructor
public class Caminhoes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String modelo;
    private String capacidade;
    private boolean disponivel;

    public Caminhoes (String placa, String modelo, String capacidade, boolean disponivel) {
        this.placa = placa;
        this.modelo = modelo;
        this.capacidade = capacidade;
        this.disponivel = disponivel;
    }

    public Caminhoes(Long id) {
        this.id = id;
    }
}
