package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.Service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tutores")
@CrossOrigin(origins = "*")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    // Listar todos los tutores
    @GetMapping
    public List<Tutor> listarTodos() {
        return tutorService.listarTodos();
    }

    // Obtener tutor por ID
    @GetMapping("/{id}")
    public Optional<Tutor> obtenerPorId(@PathVariable Integer id) {
        return tutorService.obtenerPorId(id);
    }

    // Buscar tutor por correo
    @GetMapping("/correo/{correo}")
    public Optional<Tutor> obtenerPorCorreo(@PathVariable String correo) {
        return tutorService.obtenerPorCorreo(correo);
    }

    // Filtrar por departamento
    @GetMapping("/departamento/{departamento}")
    public List<Tutor> listarPorDepartamento(@PathVariable String departamento) {
        return tutorService.listarPorDepartamento(departamento);
    }

    // Buscar por nombre del usuario relacionado
    @GetMapping("/buscar")
    public List<Tutor> buscarPorNombre(@RequestParam String nombre) {
        return tutorService.buscarPorNombre(nombre);
    }

    // Registrar nuevo tutor
    @PostMapping
    public Tutor crearTutor(@RequestBody Tutor tutor) {
        return tutorService.guardarTutor(tutor);
    }

    // Actualizar tutor
    @PutMapping("/{id}")
    public Tutor actualizarTutor(@PathVariable Integer id, @RequestBody Tutor tutor) {
        tutor.setTutorId(id);
        return tutorService.guardarTutor(tutor);
    }

    // Eliminar tutor
    @DeleteMapping("/{id}")
    public void eliminarTutor(@PathVariable Integer id) {
        tutorService.eliminarPorId(id);
    }
}
