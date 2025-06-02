package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.Service.SolicitudService;
import com.backendgestiontutoria.gestion_tutoria.dto.DashboardDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coordinador")
@CrossOrigin(origins = "*")
public class CoordinadorController {

    @Autowired
    private SolicitudService solicitudService;

    /**
     * Endpoint para obtener estadísticas del sistema:
     * total de solicitudes, tutorías completadas, aprobadas,
     * rechazadas, número de tutores y estudiantes registrados.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> obtenerResumenDashboard() {
        DashboardDTO resumen = solicitudService.obtenerResumenEstadisticas();
        return ResponseEntity.ok(resumen);
    }

    /**
     * Endpoint de prueba para confirmar que el controlador está activo.
     */
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
