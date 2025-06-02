package com.backendgestiontutoria.gestion_tutoria.repository;

import com.backendgestiontutoria.gestion_tutoria.model.LogAuditoria;
import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogAuditoriaRepository extends JpaRepository<LogAuditoria, Integer> {

    // Buscar logs por usuario
    List<LogAuditoria> findByUsuario(Usuario usuario);

    // Buscar logs por tabla afectada (útil para filtro por módulos)
    List<LogAuditoria> findByTablaAfectadaIgnoreCase(String tabla);

    // Buscar logs por tipo de acción (INSERT, DELETE, etc.)
    List<LogAuditoria> findByAccionIgnoreCase(String accion);
}
