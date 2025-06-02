package com.backendgestiontutoria.gestion_tutoria.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tutor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {

    @Id
    @Column(name = "tutor_id")
    private Integer tutorId;

    @Column(nullable = false)
    private String departamento;

    @OneToOne
    @MapsId
    @JoinColumn(name = "tutor_id")
    private Usuario usuario;
}
