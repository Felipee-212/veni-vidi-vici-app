package com.venivicivici.venivicivici.service;
import com.venivicivici.venivicivici.model.Cliente;
import com.venivicivici.venivicivici.repository.ClienteRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
// clase intermedia entre spring sec y nuestra app valida los autentications que sean un user en la base sino tira exp

@Service
public class CustomUserDetailsService implements UserDetailsService {


    private final ClienteRepository clienteRepository;
    public CustomUserDetailsService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Cliente cliente=clienteRepository.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("no existe el usuario "+username));


        return User.builder()
                .username(cliente.getEmail())
                .password(cliente.getPassword())
                .roles(cliente.getRol())
                .build();

    }


}
