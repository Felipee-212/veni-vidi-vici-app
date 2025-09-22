package com.venivicivici.venivicivici.service;

import com.venivicivici.venivicivici.dto.ClienteDTO;
import com.venivicivici.venivicivici.dto.OrdenDTO;
import com.venivicivici.venivicivici.dto.OrdenItemDTO;
import com.venivicivici.venivicivici.dto.OrdenItemRequest;
import com.venivicivici.venivicivici.exception.PeticionInvalidaException;
import com.venivicivici.venivicivici.exception.RecursoNoEncontradoException;
import com.venivicivici.venivicivici.model.*;
import com.venivicivici.venivicivici.repository.ClienteRepository;
import com.venivicivici.venivicivici.repository.OrdenRepository;
import com.venivicivici.venivicivici.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdenService {

    private OrdenRepository ordenRepository;
    private ClienteRepository clienteRepository;
    private ProductoRepository productoRepository;

    public OrdenService(OrdenRepository ordenRepository, ClienteRepository clienteRepository, ProductoRepository productoRepository) {
        this.ordenRepository = ordenRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    // crear nueva orden
    public Orden crearOrden(String  email, List<OrdenItemRequest> itemsRequest) {
        Optional<Cliente> clienteOpt = clienteRepository.findByEmail(email);

        //mira si el cleinte que se paso existe o no
        if (clienteOpt.isEmpty()) {
            throw new RecursoNoEncontradoException("Cliente no encontrado");

        }

        //si no se envio nignun producto a la request
        if (itemsRequest == null || itemsRequest.isEmpty()) {
            throw new PeticionInvalidaException("Debes enviar al menos un producto.");
        }

        //crea una orden y setea los parametros
        Orden orden = new Orden();
        orden.setCliente(clienteOpt.get());
        orden.setFecha(LocalDateTime.now());
        orden.setEstado(EstadoOrden.PENDIENTE);

        double total = 0.0;

        //listar items para diacha orden
        List<OrdenItem> items = new ArrayList<>();

        //buscle for para mostrar los productos
        for (OrdenItemRequest itemRequest : itemsRequest) {
            Optional<Producto> productoOpt = productoRepository.findById(itemRequest.getProductoId());
            if (productoOpt.isEmpty()) {
                throw new RecursoNoEncontradoException("Producto no encontrado");

            }
            Producto producto = productoOpt.get();

            if (producto.getStock() < itemRequest.getCantidad()) {
                throw new PeticionInvalidaException("No hay suficiente stock para el producto: " + producto.getNombre());
            }
                // 🔹 RESTAR stock
                producto.setStock(producto.getStock() - itemRequest.getCantidad());
                productoRepository.save(producto);

                // Crear item de la orden
                OrdenItem ordenItem = new OrdenItem();
                ordenItem.setOrden(orden);
                ordenItem.setProducto(producto);
                ordenItem.setCantidad(itemRequest.getCantidad());


                //sumar al total de la orden
            total += ordenItem.getSubtotal();
            items.add(ordenItem);

        }
        orden.setItems(items);
        orden.setTotal(total);

        return ordenRepository.save(orden);

    }


    //listar todas las ordenes de un cliente
    public List<Orden> listarOrdenesPorCliente(String email,EstadoOrden estado) {
        Optional<Cliente> clienteOpt = clienteRepository.findByEmail(email);
        if (clienteOpt.isEmpty()) {
            throw new RecursoNoEncontradoException("Cliente no encontrado");
        }
        if (estado == null) {
            return ordenRepository.findByCliente(clienteOpt.get());
        } else {
            return ordenRepository.findByClienteAndEstado(clienteOpt.get(), estado);
        }
    }

    //marcar como apagada
    public Orden pagarOrder(long ordenid) {
        Optional<Orden> ordenOpt = ordenRepository.findById(ordenid);
        if (ordenOpt.isEmpty()) {
            throw new RecursoNoEncontradoException("Orden no encontrado");
        }
        Orden orden = ordenOpt.get();

        if (orden.getEstado() == EstadoOrden.PAGADO) {
            throw new PeticionInvalidaException("La orden ya está pagada.");
        }

        orden.setEstado(EstadoOrden.PAGADO);
        return ordenRepository.save(orden);
    }

    public Orden obtenerOrdenPorId(Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Orden no encontrada con ese id"));

    }


    //dto para ocultar datos de la ordern cuando se usen protcolos get
    public OrdenDTO convertirOrdenADTO(Orden orden) {
        OrdenDTO dto = new OrdenDTO();
        dto.setId(orden.getId());
        dto.setFecha(orden.getFecha());
        dto.setTotal(orden.getTotal());
        dto.setEstado(orden.getEstado().name());

        // cliente
        ClienteDTO clienteDTO = new ClienteDTO();
        clienteDTO.setId(orden.getCliente().getId());
        clienteDTO.setNombre(orden.getCliente().getNombre());
        clienteDTO.setEmail(orden.getCliente().getEmail());
        dto.setCliente(clienteDTO);

        // items
        List<OrdenItemDTO> itemsDTO = new java.util.ArrayList<>();
        for (OrdenItem item : orden.getItems()) {
            OrdenItemDTO itemDTO = new OrdenItemDTO();
            itemDTO.setProductoId(item.getProducto().getId());
            itemDTO.setNombreProducto(item.getProducto().getNombre());
            itemDTO.setCantidad(item.getCantidad());
            itemDTO.setSubtotal(item.getSubtotal());
            itemsDTO.add(itemDTO);
        }

        dto.setItems(itemsDTO);

        return dto;
    }
    public Orden cancelarOrden(Long ordenId, String email) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new RecursoNoEncontradoException("Cliente no encontrado"));

        Orden orden = ordenRepository.findById(ordenId)
                .orElseThrow(() -> new RecursoNoEncontradoException("Orden no encontrada"));

        if (orden.getCliente().getId()!=(cliente.getId())) {
            throw new PeticionInvalidaException("No puedes cancelar órdenes de otro cliente");
        }

        if (orden.getEstado() != EstadoOrden.PENDIENTE) {
            throw new PeticionInvalidaException("Solo se pueden cancelar órdenes pendientes");
        }

        orden.setEstado(EstadoOrden.CANCELADA);
        return ordenRepository.save(orden);
    }

}