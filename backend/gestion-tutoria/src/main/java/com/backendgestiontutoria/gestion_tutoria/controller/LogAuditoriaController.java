package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.model.LogAuditoria;
import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import com.backendgestiontutoria.gestion_tutoria.Service.LogAuditoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "*")
public class LogAuditoriaController {

    @Autowired
    private LogAuditoriaService logService;

    // Listar todos los logs
    @GetMapping
    public List<LogAuditoria> listarTodos() {
        return logService.listarTodos();
    }

    // Obtener log por ID
    @GetMapping("/{id}")
    public Optional<LogAuditoria> obtenerPorId(@PathVariable Integer id) {
        return logService.obtenerPorId(id);
    }

    // Registrar nuevo log (manual)
    @PostMapping
    public LogAuditoria registrarLog(@RequestBody LogAuditoria log) {
        return logService.guardarLog(log);
    }

    // Obtener logs por usuario ID
    @GetMapping("/usuario/{usuarioId}")
    public List<LogAuditoria> listarPorUsuario(@PathVariable Integer usuarioId) {
        Usuario usuario = new Usuario();
        usuario.setUsuarioId(usuarioId);
        return logService.listarPorUsuario(usuario);
    }

    // Filtrar por tabla afectada
    @GetMapping("/tabla")
    public List<LogAuditoria> listarPorTabla(@RequestParam String tabla) {
        return logService.listarPorTablaAfectada(tabla);
    }

    // Filtrar por acción
    @GetMapping("/accion")
    public List<LogAuditoria> listarPorAccion(@RequestParam String accion) {
        return logService.listarPorAccion(accion);
    }
}
