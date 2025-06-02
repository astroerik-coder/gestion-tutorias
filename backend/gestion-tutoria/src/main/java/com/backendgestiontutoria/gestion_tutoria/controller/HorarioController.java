package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.dto.HorarioDTO;
import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.Service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "*")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    // Obtener todos los horarios como DTO
    @GetMapping
    public List<HorarioDTO> listarTodos() {
        return horarioService.listarTodos()
                .stream()
                .map(HorarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Obtener horario por ID como DTO
    @GetMapping("/{id}")
    public HorarioDTO obtenerPorId(@PathVariable Integer id) {
        return horarioService.obtenerPorId(id)
                .map(HorarioDTO::fromEntity)
                .orElse(null);
    }

    // Obtener horarios por ID de tutor
    @GetMapping("/tutor/{id}")
    public List<HorarioDTO> listarPorTutor(@PathVariable Integer id) {
        Tutor tutor = new Tutor();
        tutor.setTutorId(id);
        return horarioService.listarPorTutor(tutor)
                .stream()
                .map(HorarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar horarios por fecha
    @GetMapping("/fecha")
    public List<HorarioDTO> listarPorFecha(@RequestParam String fecha) {
        return horarioService.listarPorFecha(LocalDate.parse(fecha))
                .stream()
                .map(HorarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Crear nuevo horario
    @PostMapping
    public HorarioDTO crearHorario(@RequestBody Horario horario) {
        return HorarioDTO.fromEntity(horarioService.guardarHorario(horario));
    }

    // Actualizar horario
    @PutMapping("/{id}")
    public HorarioDTO actualizarHorario(@PathVariable Integer id, @RequestBody Horario horario) {
        horario.setHorarioId(id);
        return HorarioDTO.fromEntity(horarioService.guardarHorario(horario));
    }

    // Eliminar horario
    @DeleteMapping("/{id}")
    public void eliminarHorario(@PathVariable Integer id) {
        horarioService.eliminarPorId(id);
    }
}
