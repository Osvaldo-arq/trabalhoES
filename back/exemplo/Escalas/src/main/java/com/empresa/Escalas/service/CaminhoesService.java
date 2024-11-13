package com.empresa.Escalas.service;

import com.empresa.Escalas.model.Caminhoes;
import com.empresa.Escalas.repositories.CaminhoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaminhoesService {
    @Autowired
    private CaminhoesRepository caminhoesRepository;

    public List<Caminhoes> listarTodos() {
        return caminhoesRepository.findAll();
    }

    public Optional<Caminhoes> buscarPorId(Long id) {
        return caminhoesRepository.findById(id);
    }

    public Caminhoes salvar(Caminhoes caminhoes) {
        return caminhoesRepository.save(caminhoes);
    }

    public void excluir(Long id) {
        caminhoesRepository.deleteById(id);
    }

    public Caminhoes atualizar(Long id, Caminhoes dadosAtualizados) {
        Optional<Caminhoes> caminhoesExistenteOpt = caminhoesRepository.findById(id);
        if (caminhoesExistenteOpt.isPresent()) {
            Caminhoes caminhoesExistente = caminhoesExistenteOpt.get();
            caminhoesExistente.setPlaca(dadosAtualizados.getPlaca());
            caminhoesExistente.setModelo(dadosAtualizados.getModelo());
            caminhoesExistente.setCapacidade(dadosAtualizados.getCapacidade());
            caminhoesExistente.setDisponivel(dadosAtualizados.isDisponivel());
            return caminhoesRepository.save(caminhoesExistente);
        }
        return null;
    }
}
