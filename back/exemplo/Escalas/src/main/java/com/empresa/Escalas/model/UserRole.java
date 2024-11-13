package com.empresa.Escalas.model;

public enum UserRole {
    ADMIN,
    USER;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
