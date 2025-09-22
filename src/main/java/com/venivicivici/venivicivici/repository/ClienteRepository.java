package com.venivicivici.venivicivici.repository;

import com.venivicivici.venivicivici.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//  repositorio que conecta nuetras clases con la logica
public interface ClienteRepository extends JpaRepository<Cliente,Long> {

    // metodo para poder buscar por el email sera implementado en cliente service
    Optional<Cliente> findByEmail(String email);


}
