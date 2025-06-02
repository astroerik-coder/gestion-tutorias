package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    // Obtener estudiante por ID
    public Optional<Estudiante> obtenerPorId(Integer id) {
        return estudianteRepository.findById(id);
    }

    // Buscar estudiante por correo de usuario
    public Optional<Estudiante> obtenerPorCorreo(String correo) {
        return estudianteRepository.findByUsuarioCorreo(correo);
    }

    // Buscar estudiantes por carrera
    public List<Estudiante> listarPorCarrera(String carrera) {
        return estudianteRepository.findByCarreraIgnoreCase(carrera);
    }

    // Listar todos los estudiantes
    public List<Estudiante> listarTodos() {
        return estudianteRepository.findAll();
    }

    // Registrar o actualizar estudiante
    public Estudiante guardarEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    // Eliminar estudiante
    public void eliminarPorId(Integer id) {
        estudianteRepository.deleteById(id);
    }
}
