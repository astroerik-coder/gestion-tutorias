package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.dto.SolicitudDTO;
import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import com.backendgestiontutoria.gestion_tutoria.repository.EstudianteRepository;
import com.backendgestiontutoria.gestion_tutoria.repository.HorarioRepository;
import com.backendgestiontutoria.gestion_tutoria.Service.SolicitudService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "*")
public class SolicitudController {

    @Autowired
    private SolicitudService solicitudService;

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private HorarioRepository horarioRepository;

    // Listar todas como DTO
    @GetMapping
    public List<SolicitudDTO> listarTodas() {
        return solicitudService.listarTodas().stream()
                .map(SolicitudDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Obtener por ID
    @GetMapping("/{id}")
    public SolicitudDTO obtenerPorId(@PathVariable Integer id) {
        return solicitudService.obtenerPorId(id)
                .map(SolicitudDTO::fromEntity)
                .orElse(null);
    }

    // Crear solicitud (devuelve DTO, recibe entidad)
    @PostMapping
    public SolicitudDTO crearSolicitud(@RequestBody Solicitud solicitud) {
        Integer estudianteId = solicitud.getEstudiante().getEstudianteId();
        Integer horarioId = solicitud.getHorario().getHorarioId();

        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(estudianteId);
        Optional<Horario> horarioOpt = horarioRepository.findById(horarioId);

        if (estudianteOpt.isPresent() && horarioOpt.isPresent()) {
            solicitud.setEstudiante(estudianteOpt.get());
            solicitud.setHorario(horarioOpt.get());
            return SolicitudDTO.fromEntity(solicitudService.guardarSolicitud(solicitud));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estudiante u horario no válidos");
        }
    }

    // Actualizar solicitud
    @PutMapping("/{id}")
    public SolicitudDTO actualizarSolicitud(@PathVariable Integer id, @RequestBody Solicitud solicitud) {
        solicitud.setSolicitudId(id);
        return SolicitudDTO.fromEntity(solicitudService.guardarSolicitud(solicitud));
    }

    // Cambiar estado de la solicitud (PATCH)
    @PatchMapping("/{id}/estado")
    public SolicitudDTO cambiarEstado(@PathVariable Integer id, @RequestParam String estado) {
        Optional<Solicitud> opt = solicitudService.obtenerPorId(id);
        if (opt.isPresent()) {
            Solicitud solicitud = opt.get();
            solicitud.setEstado(Solicitud.Estado.valueOf(estado));
            return SolicitudDTO.fromEntity(solicitudService.guardarSolicitud(solicitud));
        } else {
            return null;
        }
    }

    // Listar por estado
    @GetMapping("/estado/{estado}")
    public List<SolicitudDTO> listarPorEstado(@PathVariable String estado) {
        return solicitudService.listarPorEstado(Solicitud.Estado.valueOf(estado)).stream()
                .map(SolicitudDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Listar por estudiante
    @GetMapping("/estudiante/{id}")
    public List<SolicitudDTO> listarPorEstudiante(@PathVariable Integer id) {
        Estudiante estudiante = new Estudiante();
        estudiante.setEstudianteId(id);
        return solicitudService.listarPorEstudiante(estudiante).stream()
                .map(SolicitudDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Listar por horario
    @GetMapping("/horario/{id}")
    public List<SolicitudDTO> listarPorHorario(@PathVariable Integer id) {
        Horario horario = new Horario();
        horario.setHorarioId(id);
        return solicitudService.listarPorHorario(horario).stream()
                .map(SolicitudDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar por materia
    @GetMapping("/materia")
    public List<SolicitudDTO> listarPorMateria(@RequestParam String materia) {
        return solicitudService.listarPorMateria(materia).stream()
                .map(SolicitudDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Eliminar solicitud
    @DeleteMapping("/{id}")
    public void eliminarSolicitud(@PathVariable Integer id) {
        solicitudService.eliminarPorId(id);
    }
}
