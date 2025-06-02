package com.backendgestiontutoria.gestion_tutoria.Service;

import com.backendgestiontutoria.gestion_tutoria.model.LogAuditoria;
import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import com.backendgestiontutoria.gestion_tutoria.repository.LogAuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogAuditoriaService {

    @Autowired
    private LogAuditoriaRepository logRepository;

    public List<LogAuditoria> listarTodos() {
        return logRepository.findAll();
    }

    public Optional<LogAuditoria> obtenerPorId(Integer id) {
        return logRepository.findById(id);
    }

    public LogAuditoria guardarLog(LogAuditoria log) {
        return logRepository.save(log);
    }

    public List<LogAuditoria> listarPorUsuario(Usuario usuario) {
        return logRepository.findByUsuario(usuario);
    }

    public List<LogAuditoria> listarPorTablaAfectada(String tabla) {
        return logRepository.findByTablaAfectadaIgnoreCase(tabla);
    }

    public List<LogAuditoria> listarPorAccion(String accion) {
        return logRepository.findByAccionIgnoreCase(accion);
    }
}
