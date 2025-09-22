package com.venivicivici.venivicivici.repository;

import com.venivicivici.venivicivici.model.Cliente;
import com.venivicivici.venivicivici.model.EstadoOrden;
import com.venivicivici.venivicivici.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
//  repositorio que conecta nuetras clases con la logica

public interface OrdenRepository extends JpaRepository<Orden,Long> {

    // tiene que ser implementado en orden para consultar por un cliente en una orden por un cliente
    public List<Orden> findByCliente(Cliente cliente);

    List<Orden> findByClienteAndEstado(Cliente cliente, EstadoOrden estado);

}
