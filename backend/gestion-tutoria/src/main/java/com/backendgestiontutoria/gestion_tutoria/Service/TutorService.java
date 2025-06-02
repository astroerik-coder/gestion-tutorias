package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Tutor;
import com.backendgestiontutoria.gestion_tutoria.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;

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
        return tutorRepository.save(tutor);
    }

    // Eliminar tutor
    public void eliminarPorId(Integer id) {
        tutorRepository.deleteById(id);
    }
}
