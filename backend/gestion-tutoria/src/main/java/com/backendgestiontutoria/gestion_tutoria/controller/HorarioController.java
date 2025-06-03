package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.dto.HorarioDTO;
import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.repository.TutorRepository;
import com.backendgestiontutoria.gestion_tutoria.Service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "*")
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    @Autowired
    private TutorRepository tutorRepository;

    // ✅ Listar todos los horarios como DTO
    @GetMapping
    public List<HorarioDTO> listarTodos() {
        return horarioService.listarTodos()
                .stream()
                .map(HorarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ Obtener horario por ID como DTO
    @GetMapping("/{id}")
    public ResponseEntity<HorarioDTO> obtenerPorId(@PathVariable Integer id) {
        return horarioService.obtenerPorId(id)
                .map(h -> ResponseEntity.ok(HorarioDTO.fromEntity(h)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Obtener horarios por ID de tutor
    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<HorarioDTO>> listarPorTutor(@PathVariable Integer id) {
        Optional<Tutor> tutorOpt = tutorRepository.findById(id);
        if (tutorOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<HorarioDTO> horarios = horarioService.listarPorTutor(tutorOpt.get())
                .stream()
                .map(HorarioDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(horarios);
    }

    // ✅ Buscar horarios por fecha
    @GetMapping("/fecha")
    public List<HorarioDTO> listarPorFecha(@RequestParam String fecha) {
        return horarioService.listarPorFecha(LocalDate.parse(fecha))
                .stream()
                .map(HorarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ Crear nuevo horario (requiere tutor existente)
@PostMapping
public ResponseEntity<HorarioDTO> crearHorario(@RequestBody Horario horario) {
    if (horario.getTutor() == null || horario.getTutor().getTutorId() == null) {
        return ResponseEntity.badRequest().build();
    }

    Optional<Tutor> tutorOpt = tutorRepository.findById(horario.getTutor().getTutorId());
    if (tutorOpt.isEmpty()) {
        return ResponseEntity.badRequest().body(null);
    }

    horario.setTutor(tutorOpt.get());
    Horario nuevo = horarioService.guardarHorario(horario);

    return ResponseEntity.ok(HorarioDTO.fromEntity(nuevo));
}


    // ✅ Actualizar horario
    @PutMapping("/{id}")
    public ResponseEntity<HorarioDTO> actualizarHorario(@PathVariable Integer id, @RequestBody Horario horario) {
        horario.setHorarioId(id);
        return ResponseEntity.ok(HorarioDTO.fromEntity(horarioService.guardarHorario(horario)));
    }

}
