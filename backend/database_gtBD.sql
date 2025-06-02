-- Crear base de datos
CREATE DATABASE IF NOT EXISTS gestion_tutorias CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE gestion_tutorias;

-- Tabla de usuarios
CREATE TABLE Usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('estudiante', 'tutor', 'coordinador') NOT NULL
);

-- Tabla de estudiantes
CREATE TABLE Estudiante (
    estudiante_id INT PRIMARY KEY,
    carrera VARCHAR(100),
    FOREIGN KEY (estudiante_id) REFERENCES Usuario(usuario_id)
);

-- Tabla de tutores
CREATE TABLE Tutor (
    tutor_id INT PRIMARY KEY,
    departamento VARCHAR(100),
    FOREIGN KEY (tutor_id) REFERENCES Usuario(usuario_id)
);

-- Horarios ofertados por el tutor
CREATE TABLE Horario (
    horario_id INT PRIMARY KEY AUTO_INCREMENT,
    tutor_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tutor_id) REFERENCES Tutor(tutor_id),
    INDEX(fecha)
);

-- Solicitudes de tutoría
CREATE TABLE HorarioSolicitud (
    solicitud_id INT PRIMARY KEY AUTO_INCREMENT,
    estudiante_id INT NOT NULL,
    horario_id INT NOT NULL,
    materia VARCHAR(100) NOT NULL,
    motivo TEXT NOT NULL,
    estado ENUM('Pendiente', 'Aprobada', 'Rechazada') DEFAULT 'Pendiente',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estudiante_id) REFERENCES Estudiante(estudiante_id),
    FOREIGN KEY (horario_id) REFERENCES Horario(horario_id),
    INDEX(estado)
);

-- Retroalimentación de estudiantes
CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    solicitud_id INT NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentarios TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitud_id) REFERENCES HorarioSolicitud(solicitud_id)
);

-- Auditoría de eventos
CREATE TABLE Log_Auditoria (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    tabla_afectada VARCHAR(50),
    accion VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);