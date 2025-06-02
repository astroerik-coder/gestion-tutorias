package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.Feedback;
import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    // Buscar feedback por solicitud (relación uno a uno)
    Optional<Feedback> findBySolicitud(Solicitud solicitud);

    // Listar todos los feedbacks de una solicitud por estado
    List<Feedback> findBySolicitud_Estado(Solicitud.Estado estado);

    // Obtener calificaciones por materia (para promedios en reportes)
    List<Feedback> findBySolicitud_MateriaIgnoreCase(String materia);
}
