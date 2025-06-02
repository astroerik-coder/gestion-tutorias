package com.backendgestiontutoria.gestion_tutoria.controller;

import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import com.backendgestiontutoria.gestion_tutoria.dto.UsuarioDTO;
import com.backendgestiontutoria.gestion_tutoria.Service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Listar todos (sin contraseña)
    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioService.listarTodos()
                .stream()
                .map(UsuarioDTO::fromEntity)
                .collect(Collectors.toList());
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
    public UsuarioDTO crearUsuario(@RequestBody Usuario usuario) {
        return UsuarioDTO.fromEntity(usuarioService.guardarUsuario(usuario));
    }

    // Login (se mantiene simple)
    @PostMapping("/login")
    public UsuarioDTO login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getCorreo(), usuario.getContrasena())
                .map(UsuarioDTO::fromEntity)
                .orElse(null);
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
