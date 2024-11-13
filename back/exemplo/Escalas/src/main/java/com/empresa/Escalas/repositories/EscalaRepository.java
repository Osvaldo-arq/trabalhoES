package com.empresa.Escalas.repositories;

import com.empresa.Escalas.model.Escala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EscalaRepository  extends JpaRepository<Escala, Long> {
}
