package com.venivicivici.venivicivici.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

// clase dto se usa para retornar los datos que el json devuelve pero solo con los datos que queremos mostrar
@Data
public class OrdenDTO {
    private Long id;
    private LocalDateTime fecha;
    private Double total;
    private String estado;
    private ClienteDTO cliente;
    private List<OrdenItemDTO> items;
}
