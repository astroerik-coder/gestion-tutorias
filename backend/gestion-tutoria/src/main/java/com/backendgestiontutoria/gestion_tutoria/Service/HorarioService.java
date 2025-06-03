package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.repository.HorarioRepository;
import com.backendgestiontutoria.gestion_tutoria.repository.TutorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public Optional<Horario> obtenerPorId(Integer id) {
        return horarioRepository.findById(id);
    }

    public List<Horario> listarTodos() {
        return horarioRepository.findAll();
    }

    public Horario guardarHorario(Horario horario) {
        // Validación de rango horario
        if (horario.getHoraInicio().isAfter(horario.getHoraFin()) ||
                horario.getHoraInicio().equals(horario.getHoraFin())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "⛔ La hora de inicio debe ser anterior a la hora de fin.");
        }

        // Verificar que el tutor exista
        if (horario.getTutor() != null && horario.getTutor().getTutorId() != null) {
            Optional<Tutor> tutorOpt = tutorRepository.findById(horario.getTutor().getTutorId());
            tutorOpt.ifPresent(horario::setTutor);
        }

        // Asumir disponible = true si es null
        if (horario.getDisponible() == null) {
            horario.setDisponible(true);
        }

        return horarioRepository.save(horario);
    }

    public void eliminarPorId(Integer id) {
        horarioRepository.deleteById(id);
    }

    public List<Horario> listarPorTutor(Tutor tutor) {
        return horarioRepository.findByTutor(tutor);
    }

    public List<Horario> listarPorFecha(LocalDate fecha) {
        return horarioRepository.findByFecha(fecha);
    }

    public List<Horario> listarPorTutorYFecha(Tutor tutor, LocalDate fecha) {
        return horarioRepository.findByTutorAndFecha(tutor, fecha);
    }

    public List<Horario> listarDisponiblesDesde(LocalDate fechaActual) {
        return horarioRepository.findByFechaAfter(fechaActual);
    }
}
