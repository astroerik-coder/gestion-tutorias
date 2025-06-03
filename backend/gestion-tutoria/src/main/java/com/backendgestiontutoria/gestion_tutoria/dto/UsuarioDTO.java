package com.backendgestiontutoria.gestion_tutoria.dto;

import com.backendgestiontutoria.gestion_tutoria.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Integer usuarioId;
    private String nombre;
    private String correo;
    private Usuario.Rol rol;
    private String carrera; 
    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(
            usuario.getUsuarioId(),
            usuario.getNombre(),
            usuario.getCorreo(),
            usuario.getRol(),
            usuario.getCarrera() 
        );
    }

    public Usuario toEntity() {
        Usuario usuario = new Usuario();
        usuario.setUsuarioId(this.usuarioId);
        usuario.setNombre(this.nombre);
        usuario.setCorreo(this.correo);
        usuario.setRol(this.rol);
        usuario.setCarrera(this.carrera); 
        return usuario;
    }
}