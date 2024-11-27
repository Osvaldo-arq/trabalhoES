package com.empresa.Escalas.dto;

import java.time.LocalDate;

public class EntregaDTO {
    private Long id;
    private String descricao;
    private Long caminhoesId;
    private String dataEntrega;
    private String status;
    private String endereco;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getCaminhoesId() {
        return caminhoesId;
    }

    public void setCaminhoesId(Long caminhoesId) {
        this.caminhoesId = caminhoesId;
    }

    public String getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(String dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}
