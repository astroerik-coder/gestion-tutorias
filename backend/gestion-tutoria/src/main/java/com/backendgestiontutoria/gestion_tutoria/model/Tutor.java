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

    private String departamento;

    @OneToOne
    @JoinColumn(name = "tutor_id", referencedColumnName = "usuario_id", insertable = false, updatable = false)
    private Usuario usuario;
}

