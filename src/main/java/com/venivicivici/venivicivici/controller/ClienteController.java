package com.venivicivici.venivicivici.controller;

import com.venivicivici.venivicivici.model.Cliente;
import com.venivicivici.venivicivici.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
//rest controller de clientes
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final ClienteService clienteService;

    ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    //solo pueden registrar los admin
    @PostMapping("/registrar")
    public Cliente registrarCliente(@RequestBody Cliente cliente) {
        return clienteService.registrarCliente(cliente);
    }


    //busca un cliente por el email
    @GetMapping("/buscar")
    public Optional<Cliente>  buscarClientePorEmail(@RequestParam String email) {
        return clienteService.findByEmail(email);
    }

    //login de usuario
    @PostMapping("/login")
    public boolean login(@RequestParam String email, @RequestParam String password) {
        return clienteService.login(email, password);
    }

    //listar
    @GetMapping("/listar")
    public List<Cliente> ListarClientes(){
        return clienteService.Listar();
    }
}
