package com.venivicivici.venivicivici.repository;

import com.venivicivici.venivicivici.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


// basicamente repositorio que conecta nuetras clases con la logica
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    //encontrar cliente por nombre en nuestra base
    public List<Producto> findByNombreContaining(String nombre);

    //mostrar los productos depues en el fornt, top 5
    List<Producto> findTop5ByDestacadoTrueOrderByIdDesc();

}
