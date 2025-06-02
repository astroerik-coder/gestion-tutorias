package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {

    // Buscar por correo del usuario relacionado
    Optional<Estudiante> findByUsuarioCorreo(String correo);

    // Listar estudiantes por carrera
    List<Estudiante> findByCarreraIgnoreCase(String carrera);
}
