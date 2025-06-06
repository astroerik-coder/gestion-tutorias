package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {

    // Listar solicitudes por estudiante
    List<Solicitud> findByEstudiante(Estudiante estudiante);

    // Listar solicitudes por estado
    List<Solicitud> findByEstado(Solicitud.Estado estado);

    // Listar solicitudes por horario (para identificar duplicados o disponibilidad)
    List<Solicitud> findByHorario(Horario horario);

    // Contar solicitudes por estado (útil para reportes)
    long countByEstado(Solicitud.Estado estado);

    // Obtener solicitudes de un estudiante por estado (dashboard estudiante)
    List<Solicitud> findByEstudianteAndEstado(Estudiante estudiante, Solicitud.Estado estado);

    // Buscar por materia
    List<Solicitud> findByMateriaIgnoreCase(String materia);

    // Buscar solicitudes asignadas a los horarios de un tutor
    @Query("SELECT s FROM Solicitud s WHERE s.horario.tutor.tutorId = :tutorId")
    List<Solicitud> findSolicitudesByTutorId(@Param("tutorId") Long tutorId);
}
