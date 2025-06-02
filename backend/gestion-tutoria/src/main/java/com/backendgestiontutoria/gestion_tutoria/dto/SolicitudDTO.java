package com.backendgestiontutoria.gestion_tutoria.dto;

import com.backendgestiontutoria.gestion_tutoria.model.Solicitud;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudDTO {
    private Integer idSolicitud;
    private String materia;
    private String motivo;
    private String estado;
    private String estudianteNombre;
    private String tutorNombre;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    public static SolicitudDTO fromEntity(Solicitud solicitud) {

        return new SolicitudDTO(
                solicitud.getSolicitudId(),
                solicitud.getMateria(),
                solicitud.getMotivo(),
                solicitud.getEstado().name(), // ✅ corregido aquí
                solicitud.getEstudiante().getUsuario().getNombre(),
                solicitud.getHorario().getTutor().getUsuario().getNombre(),
                solicitud.getHorario().getFecha(),
                solicitud.getHorario().getHoraInicio(),
                solicitud.getHorario().getHoraFin());

    }
}
