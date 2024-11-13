package com.empresa.Escalas.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "escalas")
@Data
@NoArgsConstructor
public class Escala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_caminhoes")
    private Caminhoes caminhoes;

    private Date data;

    private Date dataFim;

    private  String horario;

    private String turno;

    public Escala(Caminhoes caminhoes, Date data, String horario, String turno) {
        this.caminhoes = caminhoes;
        this.data = data;
        this.turno = turno;
        this.horario = horario;
    }

    public Escala(Long id) {
        this.id = id;
    }
}
