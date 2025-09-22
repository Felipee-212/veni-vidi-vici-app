package com.venivicivici.venivicivici.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Orden {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDateTime fecha;
    private double total;

    @Enumerated(EnumType.STRING)
    private EstadoOrden estado;


    @ManyToOne
    @JoinColumn(name="cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrdenItem> items;
}
