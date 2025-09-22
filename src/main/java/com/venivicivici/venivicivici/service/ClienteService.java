package com.venivicivici.venivicivici.service;

import com.venivicivici.venivicivici.model.Cliente;
import com.venivicivici.venivicivici.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    //constructor
    public ClienteService(ClienteRepository clienteRepository,BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.clienteRepository = clienteRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    //registrar clientes
    public Cliente registrarCliente(Cliente cliente) {
        String hash=bCryptPasswordEncoder.encode(cliente.getPassword());
        cliente.setPassword(hash);
        if(cliente.getRol()==null){
            cliente.setRol("USER");
        }
        return clienteRepository.save(cliente);
    }

    //lista todos los clientes
    public List<Cliente> Listar(){
        return clienteRepository.findAll();

    }

    //buscar por email
    public Optional<Cliente> findByEmail(String email) {
        return clienteRepository.findByEmail(email);

    }

    //login del usario con password encript
    public boolean login(String email, String password) {
        return clienteRepository.findByEmail(email)
                .map(c->bCryptPasswordEncoder.matches(password,c.getPassword()))
                .orElse(false);

    }
}
