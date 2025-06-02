package com.backendgestiontutoria.gestion_tutoria.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "estudiante")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Estudiante {

    @Id
    @Column(name = "estudiante_id")
    private Integer estudianteId;

    @Column(nullable = false)
    private String carrera;

    @OneToOne
    @MapsId
    @JoinColumn(name = "estudiante_id")
    private Usuario usuario;
}
