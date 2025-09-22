package com.venivicivici.venivicivici.controller;

import com.venivicivici.venivicivici.dto.OrdenDTO;
import com.venivicivici.venivicivici.dto.OrdenItemRequest;
import com.venivicivici.venivicivici.model.Cliente;
import com.venivicivici.venivicivici.model.EstadoOrden;
import com.venivicivici.venivicivici.model.Orden;
import com.venivicivici.venivicivici.service.OrdenService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.List;

//rest controller de ordenes
@RestController
@RequestMapping("/orden")
public class OrdenController {

    final OrdenService ordenService;

    public OrdenController(OrdenService ordenService) {
        this.ordenService = ordenService;
    }

    //crear nueva orden

    @PostMapping("/nueva")
    public OrdenDTO nuevaOrden(@RequestBody List<OrdenItemRequest> items) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Orden orden = ordenService.crearOrden(email, items);
        return ordenService.convertirOrdenADTO(orden);
    }
    //buscar orden para un cliente
    @GetMapping("/mis-ordenes")
    public List<OrdenDTO> buscarPorCliente(@RequestParam(required = false) EstadoOrden estado) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        List<Orden> ordenes = ordenService.listarOrdenesPorCliente(email, estado);
        return ordenes.stream()
                .map(ordenService::convertirOrdenADTO)
                .toList();
    }


    // paga una ordern que este pendiente
    @PutMapping("/pagar/{id}")
    public Orden pagarOrden(@PathVariable Long id){
        return ordenService.pagarOrder(id);
    }


    //busca una orden por id
    @GetMapping("/{id}")
    public OrdenDTO obtenerOrdenPorId(@PathVariable Long id){
        Orden orden = ordenService.obtenerOrdenPorId(id);
        return ordenService.convertirOrdenADTO(orden);
    }

    @PutMapping("/cancelar/{id}")
    public Orden cancelarOrden(@PathVariable Long id){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        String email=auth.getName();

        return ordenService.cancelarOrden(id, email);
    }

}
