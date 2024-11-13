package com.empresa.Escalas.service;

import com.empresa.Escalas.model.Funcionarios;
import com.empresa.Escalas.repositories.FuncionariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionariosService {

    @Autowired
    private FuncionariosRepository funcionariosRepository;

    public List<Funcionarios> listarTodos() {
        return funcionariosRepository.findAll();
    }

    public Optional<Funcionarios> findById(Long id) {
        return funcionariosRepository.findById(id);
    }

    public Optional<Funcionarios> encontrarPorId(Long id) {
        return funcionariosRepository.findById(id);
    }

    public Funcionarios salvar(Funcionarios funcionario) {
        return funcionariosRepository.save(funcionario);
    }

    public Funcionarios atualizar(Long id, Funcionarios dadosAtualizados) {
        return funcionariosRepository.findById(id)
                .map(funcionario -> {
                    funcionario.setNome(dadosAtualizados.getNome());
                    funcionario.setCpf(dadosAtualizados.getCpf());
                    funcionario.setEndereco(dadosAtualizados.getEndereco());
                    funcionario.setTelefone(dadosAtualizados.getTelefone());
                    funcionario.setCargo(dadosAtualizados.getCargo());
                    funcionario.setEmail(dadosAtualizados.getEmail());
                    funcionario.setAtivo(dadosAtualizados.getAtivo());

                    if (dadosAtualizados.getCaminhoes() != null) {
                        funcionario.setCaminhoes(dadosAtualizados.getCaminhoes());
                    }
                    if (dadosAtualizados.getEscalas() != null) {
                        funcionario.setEscalas(dadosAtualizados.getEscalas());
                    }

                    return funcionariosRepository.save(funcionario);
                })
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado."));
    }


    public void deletar(Long id) {
        funcionariosRepository.deleteById(id);
    }

}
