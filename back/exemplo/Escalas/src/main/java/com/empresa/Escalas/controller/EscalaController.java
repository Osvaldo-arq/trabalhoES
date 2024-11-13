package com.empresa.Escalas.controller;


import com.empresa.Escalas.model.Escala;
import com.empresa.Escalas.service.EscalaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/escalas")
public class EscalaController {

    @Autowired
    private EscalaService escalaService;

    @GetMapping
    public List<Escala> listarTodas() {
        return escalaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Escala> buscarEscalaPorId(@PathVariable Long id) {
        Optional<Escala> escalaOpt = escalaService.buscarPorId(id);
        return escalaOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Escala> cadastrarEscala(@RequestBody @Valid Escala novaEscala) {
        Escala escalaSalva = escalaService.salvar(novaEscala);
        return ResponseEntity.status(HttpStatus.CREATED).body(escalaSalva);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Escala> atualizarEscala(@PathVariable Long id, @RequestBody Escala escala) {
        return escalaService.buscarPorId(id)
                .map(existingEscala -> {
                    existingEscala.setData(escala.getData());
                    existingEscala.setDataFim(escala.getDataFim());
                    existingEscala.setHorario(escala.getHorario());
                    existingEscala.setTurno(escala.getTurno());
                    existingEscala.setCaminhoes(escala.getCaminhoes());

                    return ResponseEntity.ok(escalaService.salvarEscala(existingEscala));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEscala(@PathVariable Long id) {
        if (escalaService.buscarPorId(id).isPresent()) {
            escalaService.deletarEscala(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
