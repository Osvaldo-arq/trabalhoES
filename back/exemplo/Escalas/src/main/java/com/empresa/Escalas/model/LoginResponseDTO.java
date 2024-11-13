package com.empresa.Escalas.model;

public record LoginResponseDTO(String token, UserRole role, Long idFuncionario) {
}