package com.venivicivici.venivicivici.dto;

import lombok.Data;


// clase dto se usa para retornar los datos que el json devuelve pero solo con los datos que queremos mostrar
@Data
public class ClienteDTO {
    private Long id;
    private String nombre;
    private String email;
}
