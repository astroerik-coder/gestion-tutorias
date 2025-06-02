package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Para login: buscar por correo y contraseña
    Optional<Usuario> findByCorreoAndContrasena(String correo, String contrasena);

    // Para validar existencia de usuario por correo (por ejemplo en registro)
    Optional<Usuario> findByCorreo(String correo);

    // Obtener todos los usuarios por rol
    List<Usuario> findByRol(String rol);

    // Buscar por nombre (opcional, para filtros)
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
}
