package com.venivicivici.venivicivici.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int cantidad;


    @ManyToOne
    @JoinColumn(name="orden_id")
    private Orden orden;

    @ManyToOne
    @JoinColumn(name="producto_id")
    private Producto producto;

    public Double getSubtotal() {
        return producto.getPrecio() * cantidad;
    }
}

