package com.empresa.Escalas.service;

import com.empresa.Escalas.model.Entrega;
import com.empresa.Escalas.repositories.EntregaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntregaService {

    @Autowired
    private EntregaRepository entregaRepository;

    public List<Entrega> listarEntregas() {
        return entregaRepository.findAll();
    }

    public Entrega buscarEntregaPorId(Long id) {
        return entregaRepository.findById(id).orElse(null);
    }

    public List<Entrega> listarEntregasPorCaminhao(Long idCaminhao) {
        return entregaRepository.findByCaminhoesId(idCaminhao);
    }

    public Entrega salvarEntrega(Entrega entrega) {
        return entregaRepository.save(entrega);
    }

    public Entrega atualizarEntrega(Long id, Entrega entregaAtualizada) {
        return entregaRepository.findById(id).map(entrega -> {
            entrega.setDescricao(entregaAtualizada.getDescricao());
            entrega.setDataEntrega(entregaAtualizada.getDataEntrega());
            entrega.setStatus(entregaAtualizada.getStatus());
            entrega.setEndereco(entregaAtualizada.getEndereco());
            entrega.setCaminhoes(entregaAtualizada.getCaminhoes());
            return entregaRepository.save(entrega);
        }).orElse(null);
    }

    public Entrega atualizarStatus(Long id, String status) {
        if (!"Pendente".equals(status) && !"Entregue".equals(status) && !"Cancelada".equals(status)) {
            throw new IllegalArgumentException("Status inválido");
        }

        Entrega entrega = entregaRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Entrega não encontrada"));
        entrega.setStatus(status);
        return entregaRepository.save(entrega);
    }

    public boolean deletarEntrega(Long id) {
        if (entregaRepository.existsById(id)) {
            entregaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
