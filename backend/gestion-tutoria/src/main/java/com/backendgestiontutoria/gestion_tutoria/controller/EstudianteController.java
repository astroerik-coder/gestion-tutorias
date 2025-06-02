package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.Service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "*")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    // Obtener todos los estudiantes
    @GetMapping
    public List<Estudiante> listarTodos() {
        return estudianteService.listarTodos();
    }

    // Obtener estudiante por ID
    @GetMapping("/{id}")
    public Optional<Estudiante> obtenerPorId(@PathVariable Integer id) {
        return estudianteService.obtenerPorId(id);
    }

    // Buscar por correo del usuario vinculado
    @GetMapping("/correo/{correo}")
    public Optional<Estudiante> obtenerPorCorreo(@PathVariable String correo) {
        return estudianteService.obtenerPorCorreo(correo);
    }

    // Buscar estudiantes por carrera
    @GetMapping("/carrera/{carrera}")
    public List<Estudiante> listarPorCarrera(@PathVariable String carrera) {
        return estudianteService.listarPorCarrera(carrera);
    }

    // Registrar nuevo estudiante
    @PostMapping
    public Estudiante crearEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteService.guardarEstudiante(estudiante);
    }

    // Actualizar estudiante
    @PutMapping("/{id}")
    public Estudiante actualizarEstudiante(@PathVariable Integer id, @RequestBody Estudiante estudiante) {
        estudiante.setEstudianteId(id);
        return estudianteService.guardarEstudiante(estudiante);
    }

    // Eliminar estudiante
    @DeleteMapping("/{id}")
    public void eliminarPorId(@PathVariable Integer id) {
        estudianteService.eliminarPorId(id);
    }
}
