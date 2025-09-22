package com.venivicivici.venivicivici.service;

import com.venivicivici.venivicivici.exception.PeticionInvalidaException;
import com.venivicivici.venivicivici.exception.RecursoNoEncontradoException;
import com.venivicivici.venivicivici.model.Orden;
import com.venivicivici.venivicivici.model.Producto;
import com.venivicivici.venivicivici.repository.OrdenRepository;
import com.venivicivici.venivicivici.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final OrdenRepository ordenRepository;

    // implementa el repo
    public ProductoService(ProductoRepository productoRepository, OrdenRepository ordenRepository) {this.productoRepository = productoRepository;
        this.ordenRepository = ordenRepository;
    }

    //buscar los que continen este nombre
    public List<Producto> findByNombreContaining(String nombre) {
        return productoRepository.findByNombreContaining(nombre);
    }

    //guardar productos
    public Producto registrarProducto(Producto producto) {
        return productoRepository.save(producto);
    }


    //listar productos
    public List<Producto>listarProductos(){
        return productoRepository.findAll();

    }
    //buscar por id
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    //agregar stock
    public Producto actualizarStock(Long productoid,int nuevoStock){
        Producto producto = productoRepository.findById(productoid)
                .orElseThrow(()->new RecursoNoEncontradoException("Producto no encontrado"));

        if (nuevoStock<0){
            throw new PeticionInvalidaException("no se puede ingresar stock menor a 0");
        }
        producto.setStock(nuevoStock);
        return productoRepository.save(producto);
    }
    //listar los destacados
    public List<Producto> listarDestacados() {
        return productoRepository.findTop5ByDestacadoTrueOrderByIdDesc();
    }
    //poner un producto como destacado
    public Producto marcarDestacado(Long id, boolean destacado){
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado"));
        p.setDestacado(destacado);
        return productoRepository.save(p);
    }
    //cambiarle la imagen a un producto
    public Producto actualizarImagen(Long id, String url){
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado"));
        p.setImagenUrl(url);
        return productoRepository.save(p);}
}
