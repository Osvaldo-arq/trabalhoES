package com.empresa.Escalas.model;

public record RegisterDTO(String login, String password, UserRole role, Long funcionario) {
}

