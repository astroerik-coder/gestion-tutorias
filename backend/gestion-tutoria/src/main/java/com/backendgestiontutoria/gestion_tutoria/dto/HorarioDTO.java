package com.backendgestiontutoria.gestion_tutoria.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

import com.backendgestiontutoria.gestion_tutoria.model.Horario;

@Data
public class HorarioDTO {
    private Integer tutorId;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;

    // ✅ Método estático requerido por el controlador
    public static HorarioDTO fromEntity(Horario horario) {
        HorarioDTO dto = new HorarioDTO();
        dto.setTutorId(horario.getTutor().getTutorId());
        dto.setFecha(horario.getFecha());
        dto.setHoraInicio(horario.getHoraInicio());
        dto.setHoraFin(horario.getHoraFin());
        return dto;
    }
}