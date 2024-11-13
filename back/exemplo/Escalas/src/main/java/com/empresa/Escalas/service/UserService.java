package com.empresa.Escalas.service;

import com.empresa.Escalas.model.User;
import com.empresa.Escalas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> listarTodos() {
        return userRepository.findAll();
    }
}