package com.empresa.Escalas.controller;

import com.empresa.Escalas.model.Funcionarios;
import com.empresa.Escalas.repositories.FuncionariosRepository;
import com.empresa.Escalas.service.FuncionariosService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionariosController {
    @Autowired
    private FuncionariosService funcionarioService;

    @Autowired
    private FuncionariosRepository funcionariosRepository;

    @GetMapping
    public ResponseEntity<List<Funcionarios>> listarTodos() {
        List<Funcionarios> funcionarios = funcionariosRepository.findAll();
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/api/funcionarios/{id}")
    public ResponseEntity<Funcionarios> getFuncionario(@PathVariable Long idFuncionario) {
        Optional<Funcionarios> funcionarioOpt = funcionarioService.findById(idFuncionario);
        if (funcionarioOpt.isPresent()) {
            return ResponseEntity.ok(funcionarioOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionarios> encontrarPorId(@PathVariable Long id) {
        return funcionarioService.encontrarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/funcionarios/{idFuncionario}")
    public ResponseEntity<Funcionarios> obterFuncionarioPorId(@PathVariable Long idFuncionario) {
        Optional<Funcionarios> funcionarioOpt = funcionariosRepository.findById(idFuncionario);
        if (funcionarioOpt.isPresent()) {
            Funcionarios funcionario = funcionarioOpt.get();
            return ResponseEntity.ok(funcionario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Funcionarios> cadastrarFuncionario(@RequestBody @Valid Funcionarios novoFuncionario) {
        Funcionarios funcionarioSalvo = funcionarioService.salvar(novoFuncionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionarios> atualizarFuncionario(@PathVariable Long id, @RequestBody @Valid Funcionarios dadosAtualizados) {
        Funcionarios funcionarioAtualizado = funcionarioService.atualizar(id, dadosAtualizados);
        return ResponseEntity.ok(funcionarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarFuncionario(@PathVariable Long id) {
        funcionarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
