package com.empresa.Escalas.controller;

import com.empresa.Escalas.dto.EntregaDTO;
import com.empresa.Escalas.dto.StatusUpdate;
import com.empresa.Escalas.model.Entrega;
import com.empresa.Escalas.service.EntregaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entregas")
public class EntregaController {

    @Autowired
    private EntregaService entregaService;

    @GetMapping
    public ResponseEntity<List<Entrega>> listarEntregas() {
        return ResponseEntity.ok(entregaService.listarEntregas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrega> buscarEntregaPorId(@PathVariable Long id) {
        Entrega entrega = entregaService.buscarEntregaPorId(id);
        return entrega != null ? ResponseEntity.ok(entrega) : ResponseEntity.notFound().build();
    }

    @GetMapping("/caminhao/{idCaminhao}")
    public ResponseEntity<List<Entrega>> listarEntregasPorCaminhao(@PathVariable Long idCaminhao) {
        List<Entrega> entregas = entregaService.listarEntregasPorCaminhao(idCaminhao);
        return ResponseEntity.ok(entregas);
    }

    @PostMapping
    public ResponseEntity<Entrega> adicionarEntrega(@RequestBody Entrega entrega) {
        Entrega novaEntrega = entregaService.salvarEntrega(entrega);
        return ResponseEntity.ok(novaEntrega);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Entrega> adicionarEntregas(@RequestBody Entrega entrega) {
        Entrega novaEntrega = entregaService.salvarEntrega(entrega);
        return ResponseEntity.ok(novaEntrega);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entrega> atualizarEntrega(@PathVariable Long id, @RequestBody EntregaDTO entregaDTO) {
        Entrega entregaExistente = entregaService.buscarEntregaPorId(id);
        if (entregaExistente == null) {
            return ResponseEntity.notFound().build();
        }

        entregaExistente.setStatus(entregaDTO.getStatus());
        entregaExistente.setEndereco(entregaDTO.getEndereco());
        entregaExistente.setDescricao(entregaDTO.getDescricao());
        entregaExistente.setDataEntrega(entregaDTO.getDataEntrega());
        Entrega entregaAtualizada = entregaService.salvarEntrega(entregaExistente);
        return ResponseEntity.ok(entregaAtualizada);
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<Entrega> atualizarStatus(@PathVariable Long id, @RequestBody StatusUpdate statusUpdate) {
        try {
            Entrega entregaAtualizada = entregaService.atualizarStatus(id, statusUpdate.getStatus());
            return ResponseEntity.ok(entregaAtualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEntrega(@PathVariable Long id) {
        boolean deleted = entregaService.deletarEntrega(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
