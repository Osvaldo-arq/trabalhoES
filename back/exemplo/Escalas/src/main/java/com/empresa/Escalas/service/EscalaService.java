package com.empresa.Escalas.service;

import com.empresa.Escalas.model.Escala;
import com.empresa.Escalas.repositories.EscalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EscalaService {
    @Autowired
    private EscalaRepository escalaRepository;

    public List<Escala> getUserById() {
        return escalaRepository.findAll();
    }

    public List<Escala> listarTodas() {
        return escalaRepository.findAll();
    }

    public Optional<Escala> buscarPorId(Long id) {
        return escalaRepository.findById(id);
    }

    public Escala salvar(Escala novaEscala) {
        return escalaRepository.save(novaEscala);
    }

    public Escala salvarEscala(Escala escala) {
        return escalaRepository.save(escala);
    }

    public void deletarEscala(Long id) {
        escalaRepository.deleteById(id);
    }
}
