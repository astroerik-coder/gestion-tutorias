package com.backendgestiontutoria.gestion_tutoria.dto;

import com.backendgestiontutoria.gestion_tutoria.model.Horario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HorarioDTO {
    private Integer horarioId;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String tutorNombre;
    private String departamento;

    public static HorarioDTO fromEntity(Horario horario) {
        return new HorarioDTO(
            horario.getHorarioId(),
            horario.getFecha(),
            horario.getHoraInicio(),
            horario.getHoraFin(),
            horario.getTutor().getUsuario().getNombre(),
            horario.getTutor().getDepartamento()
        );
    }
}
