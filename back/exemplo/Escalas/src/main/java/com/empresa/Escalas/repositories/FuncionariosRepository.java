package com.empresa.Escalas.repositories;

import com.empresa.Escalas.model.Funcionarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuncionariosRepository extends JpaRepository<Funcionarios, Long> {
    Funcionarios findByEmail(String email);


}
