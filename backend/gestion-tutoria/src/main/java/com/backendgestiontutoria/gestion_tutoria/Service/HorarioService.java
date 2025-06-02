package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    // Obtener horario por ID
    public Optional<Horario> obtenerPorId(Integer id) {
        return horarioRepository.findById(id);
    }

    // Listar todos los horarios
    public List<Horario> listarTodos() {
        return horarioRepository.findAll();
    }

    // Guardar o actualizar horario
    public Horario guardarHorario(Horario horario) {
        return horarioRepository.save(horario);
    }

    // Eliminar horario
    public void eliminarPorId(Integer id) {
        horarioRepository.deleteById(id);
    }

    // Buscar horarios por tutor
    public List<Horario> listarPorTutor(Tutor tutor) {
        return horarioRepository.findByTutor(tutor);
    }

    // Buscar horarios por fecha exacta
    public List<Horario> listarPorFecha(LocalDate fecha) {
        return horarioRepository.findByFecha(fecha);
    }

    // Buscar horarios por tutor y fecha
    public List<Horario> listarPorTutorYFecha(Tutor tutor, LocalDate fecha) {
        return horarioRepository.findByTutorAndFecha(tutor, fecha);
    }

    // Horarios futuros (disponibles desde hoy en adelante)
    public List<Horario> listarDisponiblesDesde(LocalDate fechaActual) {
        return horarioRepository.findByFechaAfter(fechaActual);
    }
}
