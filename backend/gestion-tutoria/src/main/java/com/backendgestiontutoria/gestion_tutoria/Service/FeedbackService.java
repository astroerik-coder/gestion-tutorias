package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.Feedback;
import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import com.backendgestiontutoria.gestion_tutoria.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Obtener feedback por ID
    public Optional<Feedback> obtenerPorId(Integer id) {
        return feedbackRepository.findById(id);
    }

    // Obtener feedback por solicitud
    public Optional<Feedback> obtenerPorSolicitud(Solicitud solicitud) {
        return feedbackRepository.findBySolicitud(solicitud);
    }

    // Listar todos los feedbacks
    public List<Feedback> listarTodos() {
        return feedbackRepository.findAll();
    }

    // Listar por estado de solicitud (Aprobada, Rechazada, etc.)
    public List<Feedback> listarPorEstadoSolicitud(Solicitud.Estado estado) {
        return feedbackRepository.findBySolicitud_Estado(estado);
    }

    // Listar feedbacks por materia
    public List<Feedback> listarPorMateria(String materia) {
        return feedbackRepository.findBySolicitud_MateriaIgnoreCase(materia);
    }

    // Guardar o actualizar feedback
    public Feedback guardarFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Eliminar feedback
    public void eliminarPorId(Integer id) {
        feedbackRepository.deleteById(id);
    }
}
