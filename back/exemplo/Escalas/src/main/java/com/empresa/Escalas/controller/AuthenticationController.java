package com.empresa.Escalas.controller;


import com.empresa.Escalas.model.*;
import com.empresa.Escalas.repositories.FuncionariosRepository;
import com.empresa.Escalas.repositories.UserRepository;
import com.empresa.Escalas.service.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private FuncionariosRepository funcionariosRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            System.out.println("Attempting login for: " + data.login());

            var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            User user = (User) auth.getPrincipal();
            Long idFuncionario = user.getFuncionario() != null ? user.getFuncionario().getId() : null;

            var token = tokenService.generateToken(user);

            return ResponseEntity.ok(new LoginResponseDTO(token, user.getRole(), idFuncionario));
        } catch (BadCredentialsException e) {
            System.out.println("Login failed for: " + data.login());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalido username ou password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro durante o processo de login");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if (this.repository.findByLogin(data.login()) != null) {
            return ResponseEntity.badRequest().build();
        }

        Funcionarios funcionario = null;
        if (data.funcionario() != null) {
            funcionario = funcionariosRepository.findById(data.funcionario())
                    .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com ID: " + data.funcionario()));
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, data.role(), funcionario);

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }


}
