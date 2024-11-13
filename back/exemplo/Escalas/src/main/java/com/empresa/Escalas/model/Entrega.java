package com.empresa.Escalas.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "entregas")
@Getter
@Setter
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_caminhao")
    private Caminhoes caminhoes;

    @Column(name = "data_entrega")
    private LocalDate dataEntrega;

    @Column(name = "status")
    private String status;

    @Column(name = "endereco")
    private String endereco;

    public Entrega(
            String descricao,
            Funcionarios funcionarios,
            Caminhoes caminhoes,
            LocalDate dataEntrega,
            String status,
            String endereco
    ) {
        this.descricao = descricao;
        this.caminhoes = caminhoes;
        this.dataEntrega = dataEntrega;
        this.status = status;
        this.endereco = endereco;
    }
}