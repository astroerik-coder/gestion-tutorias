package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Estudiante;
import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import com.backendgestiontutoria.gestion_tutoria.repository.EstudianteRepository;
import com.backendgestiontutoria.gestion_tutoria.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
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
        Integer usuarioId = estudiante.getEstudianteId(); // estudianteId = usuarioId

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario no existe");
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getRol().name().equalsIgnoreCase("estudiante")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario no tiene rol de estudiante");
        }

        return estudianteRepository.save(estudiante);
    }


    // Eliminar estudiante
    public void eliminarPorId(Integer id) {
        estudianteRepository.deleteById(id);
    }
}
