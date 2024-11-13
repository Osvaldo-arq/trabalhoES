package com.empresa.Escalas.repositories;


import com.empresa.Escalas.model.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {
    List<Entrega> findByCaminhoesId(Long idCaminhao);
}
