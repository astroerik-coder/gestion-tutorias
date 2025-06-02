package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.dto.DashboardDTO;
import com.backendgestiontutoria.gestion_tutoria.dto.SolicitudDTO;
import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import com.backendgestiontutoria.gestion_tutoria.repository.SolicitudRepository;
import com.backendgestiontutoria.gestion_tutoria.repository.TutorRepository;
import com.backendgestiontutoria.gestion_tutoria.repository.EstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

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

    // Buscar por estado
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

    // Obtener solicitudes asignadas a un tutor (según sus horarios)
    public List<SolicitudDTO> obtenerSolicitudesPorTutor(Long tutorId) {
        List<Solicitud> solicitudes = solicitudRepository.findSolicitudesByTutorId(tutorId);
        return solicitudes.stream()
                .map(SolicitudDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Obtener estadísticas para dashboard del coordinador
    public DashboardDTO obtenerResumenEstadisticas() {
        long totalSolicitudes = solicitudRepository.count();
        long completadas = solicitudRepository.countByEstado(Solicitud.Estado.Completada);
        long aprobadas = solicitudRepository.countByEstado(Solicitud.Estado.Aprobada);
        long rechazadas = solicitudRepository.countByEstado(Solicitud.Estado.Rechazada);
        long totalTutores = tutorRepository.count();
        long totalEstudiantes = estudianteRepository.count();

        return new DashboardDTO(
            totalSolicitudes,
            completadas,
            aprobadas,
            rechazadas,
            totalTutores,
            totalEstudiantes
        );
    }
}
