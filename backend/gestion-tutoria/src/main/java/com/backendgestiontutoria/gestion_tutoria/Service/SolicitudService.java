package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository solicitudRepository;

    // Obtener por ID
    public Optional<Solicitud> obtenerPorId(Integer id) {
        return solicitudRepository.findById(id);
    }

    // Listar todas
    public List<Solicitud> listarTodas() {
        return solicitudRepository.findAll();
    }

    // Guardar o actualizar
    public Solicitud guardarSolicitud(Solicitud solicitud) {
        return solicitudRepository.save(solicitud);
    }

    // Eliminar por ID
    public void eliminarPorId(Integer id) {
        solicitudRepository.deleteById(id);
    }

    // Buscar por estado (Aprobada, Pendiente, etc.)
    public List<Solicitud> listarPorEstado(Solicitud.Estado estado) {
        return solicitudRepository.findByEstado(estado);
    }

    // Buscar por estudiante
    public List<Solicitud> listarPorEstudiante(Estudiante estudiante) {
        return solicitudRepository.findByEstudiante(estudiante);
    }

    // Buscar por horario
    public List<Solicitud> listarPorHorario(Horario horario) {
        return solicitudRepository.findByHorario(horario);
    }

    // Buscar por materia
    public List<Solicitud> listarPorMateria(String materia) {
        return solicitudRepository.findByMateriaIgnoreCase(materia);
    }
}
