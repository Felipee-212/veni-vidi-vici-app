package com.venivicivici.venivicivici.controller;

import com.venivicivici.venivicivici.model.Producto;
import com.venivicivici.venivicivici.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


//rest controller de producto
@RestController
@RequestMapping("/producto")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {this.productoService = productoService;}


    //buscar producto por nombre
    @GetMapping("/buscar")
    public List<Producto> buscarProductosPorNombre(@RequestParam String nombre){
        return productoService.findByNombreContaining(nombre);
    }

    //registra un producto nuevo
    @PostMapping("/registrar")
    public Producto registrarProducto(@RequestBody Producto producto){
        return productoService.registrarProducto(producto);
    }


    //lista todos los productos
    @GetMapping("/listar")
    public List<Producto> listarProductos(){
        return productoService.listarProductos();
    }


    //retorna el producto por su id
    @GetMapping("/buscarid")
    public Optional<Producto> buscarProductoPorId(@RequestParam long id){
        return productoService.findById(id);
    }

    @PutMapping("/actualizar-stock/{id}")
    public Producto actualizarStockProducto(@PathVariable long id,@RequestParam int stock){
        return productoService.actualizarStock(id, stock);
    }
    @GetMapping("/destacados")
    public List<Producto> destacados() {
        return productoService.listarDestacados();
    }

    @PutMapping("/{id}/destacado")
    public Producto setDestacado(@PathVariable Long id, @RequestParam boolean destacado) {
        return productoService.marcarDestacado(id, destacado);
    }

    @PutMapping("/{id}/imagen")
    public Producto setImagen(@PathVariable Long id, @RequestParam String url) {
        return productoService.actualizarImagen(id, url);
    }

}
