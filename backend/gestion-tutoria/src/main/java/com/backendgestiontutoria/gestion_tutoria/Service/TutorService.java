package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import com.backendgestiontutoria.gestion_tutoria.repository.TutorRepository;
import com.backendgestiontutoria.gestion_tutoria.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;
    @Autowired

      private UsuarioRepository usuarioRepository;

    // Obtener tutor por ID
    public Optional<Tutor> obtenerPorId(Integer id) {
        return tutorRepository.findById(id);
    }

    // Buscar tutor por correo del usuario
    public Optional<Tutor> obtenerPorCorreo(String correo) {
        return tutorRepository.findByUsuarioCorreo(correo);
    }

    // Buscar tutores por departamento
    public List<Tutor> listarPorDepartamento(String departamento) {
        return tutorRepository.findByDepartamentoIgnoreCase(departamento);
    }

    // Buscar por nombre del usuario relacionado
    public List<Tutor> buscarPorNombre(String nombre) {
        return tutorRepository.findByUsuarioNombreContainingIgnoreCase(nombre);
    }

    // Listar todos los tutores
    public List<Tutor> listarTodos() {
        return tutorRepository.findAll();
    }

    // Guardar o actualizar tutor
 public Tutor guardarTutor(Tutor tutor) {
        Integer usuarioId = tutor.getTutorId(); // como tutorId = usuarioId

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario no existe");
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getRol().name().equalsIgnoreCase("tutor")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario no tiene rol de tutor");
        }

        return tutorRepository.save(tutor);
    }
    // Eliminar tutor
    public void eliminarPorId(Integer id) {
        tutorRepository.deleteById(id);
    }
}
