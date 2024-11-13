package com.empresa.Escalas.controller;

import com.empresa.Escalas.model.Caminhoes;
import com.empresa.Escalas.service.CaminhoesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/caminhoes")
public class CaminhoesController {

    @Autowired
    private CaminhoesService caminhoesService;

    @GetMapping
    public ResponseEntity<List<Caminhoes>> listarTodos() {
        List<Caminhoes> caminhoes = caminhoesService.listarTodos();
        return ResponseEntity.ok(caminhoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caminhoes> buscarCaminhaoPorId(@PathVariable Long id) {
        Optional<Caminhoes> caminhaoOpt = caminhoesService.buscarPorId(id);
        return caminhaoOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Caminhoes> cadastrarCaminhao(@RequestBody @Valid Caminhoes novoCaminhao) {
        Caminhoes caminhaoSalvo = caminhoesService.salvar(novoCaminhao);
        return ResponseEntity.status(HttpStatus.CREATED).body(caminhaoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Caminhoes> atualizarCaminhao(@PathVariable Long id, @RequestBody @Valid Caminhoes dadosAtualizados) {
        Optional<Caminhoes> caminhaoExistente = caminhoesService.buscarPorId(id);
        if (caminhaoExistente.isPresent()) {
            dadosAtualizados.setId(id);
            Caminhoes caminhaoAtualizado = caminhoesService.salvar(dadosAtualizados);
            return ResponseEntity.ok(caminhaoAtualizado);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCaminhao(@PathVariable Long id) {
        Optional<Caminhoes> caminhaoOpt = caminhoesService.buscarPorId(id);
        if (caminhaoOpt.isPresent()) {
            caminhoesService.excluir(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
