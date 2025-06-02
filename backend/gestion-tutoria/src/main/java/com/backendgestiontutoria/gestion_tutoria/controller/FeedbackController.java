package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.model.Feedback;
import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import com.backendgestiontutoria.gestion_tutoria.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Listar todos los feedbacks
    @GetMapping
    public List<Feedback> listarTodos() {
        return feedbackService.listarTodos();
    }

    // Obtener por ID
    @GetMapping("/{id}")
    public Optional<Feedback> obtenerPorId(@PathVariable Integer id) {
        return feedbackService.obtenerPorId(id);
    }

    // Obtener por solicitud
    @GetMapping("/solicitud/{id}")
    public Optional<Feedback> obtenerPorSolicitud(@PathVariable Integer id) {
        Solicitud solicitud = new Solicitud();
        solicitud.setSolicitudId(id);
        return feedbackService.obtenerPorSolicitud(solicitud);
    }

    // Crear nuevo feedback
    @PostMapping
    public Feedback crearFeedback(@RequestBody Feedback feedback) {
        return feedbackService.guardarFeedback(feedback);
    }

    // Actualizar feedback
    @PutMapping("/{id}")
    public Feedback actualizarFeedback(@PathVariable Integer id, @RequestBody Feedback feedback) {
        feedback.setFeedbackId(id);
        return feedbackService.guardarFeedback(feedback);
    }

    // Eliminar feedback
    @DeleteMapping("/{id}")
    public void eliminarFeedback(@PathVariable Integer id) {
        feedbackService.eliminarPorId(id);
    }
}
