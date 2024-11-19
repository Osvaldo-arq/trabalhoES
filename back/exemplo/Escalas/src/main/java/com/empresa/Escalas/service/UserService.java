package com.empresa.Escalas.service;

import com.empresa.Escalas.model.Funcionarios;
import com.empresa.Escalas.model.RegisterDTO;
import com.empresa.Escalas.model.User;
import com.empresa.Escalas.repositories.FuncionariosRepository;
import com.empresa.Escalas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FuncionariosRepository funcionariosRepository;

    public List<User> listarTodos() {
        return userRepository.findAll();
    }

    public User obterPorId(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User criarUsuario(RegisterDTO data) {
        Funcionarios funcionario = funcionariosRepository.findById(data.funcionario())
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        User newUser = new User(data.login(), new BCryptPasswordEncoder().encode(data.password()), data.role(), funcionario);
        return userRepository.save(newUser);
    }

    public User atualizarUsuario(Long id, RegisterDTO data) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setLogin(data.login());
            user.setPassword(new BCryptPasswordEncoder().encode(data.password()));
            user.setRole(data.role());

            Funcionarios funcionario = null;
            if (data.funcionario() != null) {
                funcionario = funcionariosRepository.findById(data.funcionario())
                        .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com ID: " + data.funcionario()));
            }
            user.setFuncionario(funcionario);

            return userRepository.save(user);
        }
        return null;
    }

    public boolean deletarUsuario(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
