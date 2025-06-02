package com.backendgestiontutoria.gestion_tutoria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
    private long totalSolicitudes;
    private long solicitudesCompletadas;
    private long solicitudesAprobadas;
    private long solicitudesRechazadas;
    private long totalTutores;
    private long totalEstudiantes;
}
