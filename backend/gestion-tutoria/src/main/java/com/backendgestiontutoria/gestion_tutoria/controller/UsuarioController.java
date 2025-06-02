package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.model.LogAuditoria;
import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import com.backendgestiontutoria.gestion_tutoria.security.JwtUtil;
import com.backendgestiontutoria.gestion_tutoria.dto.UsuarioDTO;
import com.backendgestiontutoria.gestion_tutoria.Service.LogAuditoriaService;
import com.backendgestiontutoria.gestion_tutoria.Service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private LogAuditoriaService auditoriaService;

    // Listar todos (sin contraseña)
    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioService.listarTodos()
                .stream()
                .map(UsuarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Login (se mantiene NO simple)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getCorreo(), usuario.getContrasena())
                .map(u -> {
                    String token = jwtUtil.generateToken(u.getCorreo(), u.getRol().name());
                    // ✅ Mostrar en consola los datos del usuario autenticado
                    System.out.println("🔐 LOGIN exitoso");
                    System.out.println("📧 Usuario: " + u.getCorreo());
                    System.out.println("🎭 Rol: " + u.getRol().name());
                    System.out.println("🪙 Token generado: " + token);
                    // Registrar log de inicio de sesión
                    LogAuditoria log = new LogAuditoria();
                    log.setUsuario(u);
                    log.setTablaAfectada("usuario");
                    log.setAccion("LOGIN");
                    log.setDescripcion("Inicio de sesión exitoso");
                    auditoriaService.guardarLog(log);

                    return ResponseEntity.ok().body(Map.of(
                            "token", token,
                            "usuario", UsuarioDTO.fromEntity(u)));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Credenciales inválidas")));

    }

    // Obtener por ID
    @GetMapping("/{id}")
    public UsuarioDTO obtenerPorId(@PathVariable Integer id) {
        return usuarioService.obtenerPorId(id)
                .map(UsuarioDTO::fromEntity)
                .orElse(null);
    }

    // Buscar por correo
    @GetMapping("/correo/{correo}")
    public UsuarioDTO buscarPorCorreo(@PathVariable String correo) {
        return usuarioService.obtenerPorCorreo(correo)
                .map(UsuarioDTO::fromEntity)
                .orElse(null);
    }

    // Filtrar por rol
    @GetMapping("/rol/{rol}")
    public List<UsuarioDTO> listarPorRol(@PathVariable String rol) {
        return usuarioService.listarPorRol(rol)
                .stream()
                .map(UsuarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Buscar por nombre parcial
    @GetMapping("/buscar")
    public List<UsuarioDTO> buscarPorNombre(@RequestParam String nombre) {
        return usuarioService.buscarPorNombre(nombre)
                .stream()
                .map(UsuarioDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Crear usuario (acepta la entidad porque necesita contraseña)
    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);

        String token = jwtUtil.generateToken(nuevoUsuario.getCorreo(), nuevoUsuario.getRol().name());

        // Registrar log de creación
        LogAuditoria log = new LogAuditoria();
        log.setUsuario(nuevoUsuario);
        log.setTablaAfectada("usuario");
        log.setAccion("REGISTRO");
        log.setDescripcion("Registro de nuevo usuario");
        auditoriaService.guardarLog(log);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "token", token,
                "usuario", UsuarioDTO.fromEntity(nuevoUsuario)));
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Integer id) {
        usuarioService.eliminarUsuario(id);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public UsuarioDTO actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        usuario.setUsuarioId(id);
        return UsuarioDTO.fromEntity(usuarioService.guardarUsuario(usuario));
    }
}
