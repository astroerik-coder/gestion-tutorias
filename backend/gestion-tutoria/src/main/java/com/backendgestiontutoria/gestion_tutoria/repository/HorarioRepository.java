package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Integer> {

    // Listar todos los horarios de un tutor
    List<Horario> findByTutor(Tutor tutor);

    // Buscar horarios por fecha exacta
    List<Horario> findByFecha(LocalDate fecha);

    // Buscar por tutor y fecha (útil para frontend)
    List<Horario> findByTutorAndFecha(Tutor tutor, LocalDate fecha);

    // Buscar por fecha posterior a hoy (horarios futuros)
    List<Horario> findByFechaAfter(LocalDate fecha);
}
