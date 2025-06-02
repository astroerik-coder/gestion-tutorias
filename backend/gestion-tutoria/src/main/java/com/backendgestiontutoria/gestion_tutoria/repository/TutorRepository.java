package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer> {

    // Buscar tutor por correo del usuario relacionado
    Optional<Tutor> findByUsuarioCorreo(String correo);

    // Buscar tutores por departamento (útil para filtros o reportes)
    List<Tutor> findByDepartamentoIgnoreCase(String departamento);

    // Buscar por nombre (como filtro libre)
    List<Tutor> findByUsuarioNombreContainingIgnoreCase(String nombre);
}
