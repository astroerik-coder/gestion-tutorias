import axios from "axios";
import API_ENDPOINTS from "../config/api";

const API_URL = "http://localhost:8080/api";

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(
      "Sesión expirada o no autorizada. Redirigiendo al login..."
    );
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//Login
export const authService = {
  login: async (correo, contrasena) => {
    try {
      const response = await api.post("/usuarios/login", {
        correo,
        contrasena,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      }
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

//Feedback estudiante
export const feedbackService = {
  sendFeedback: async ({ solicitudId, calificacion, comentarios }) => {
    try {
      const response = await api.post("/feedback", {
        solicitudId,
        calificacion,
        comentarios,
      });
      return response.data;
    } catch (error) {
      console.error("Error al enviar feedback:", error);
      throw error;
    }
  },
};

// Servicio de horarios
export const horarioService = {
  getHorarios: async () => {
    try {
      const response = await api.get("/horarios");
      return response.data;
    } catch (error) {
      console.error("Error al obtener horarios:", error);
      throw error;
    }
  },

  getHorariosPorTutor: async (tutorId) => {
    try {
      const response = await api.get(`/horarios/tutor/${tutorId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener horarios del tutor:", error);
      throw error;
    }
  },

  getHorariosPorFecha: async (fecha) => {
    try {
      const response = await api.get(
        `/horarios/fecha?fecha=${fecha.toISOString().split("T")[0]}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener horarios por fecha:", error);
      throw error;
    }
  },

  createHorario: async (horario) => {
    try {
      const response = await api.post("/horarios", horario);
      return response.data;
    } catch (error) {
      console.error("Error al crear horario:", error);
      throw error;
    }
  },

  updateHorario: async (id, horario) => {
    try {
      const response = await api.put(`/horarios/${id}`, horario);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar horario:", error);
      throw error;
    }
  },

  deleteHorario: async (id) => {
    try {
      await api.delete(`/horarios/${id}`);
    } catch (error) {
      console.error("Error al eliminar horario:", error);
      throw error;
    }
  },
};

// Servicio de solicitudes
export const solicitudService = {
  getSolicitudes: async () => {
    try {
      const response = await api.get("/solicitudes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
      throw error;
    }
  },

  getSolicitudesPorEstudiante: async (estudianteId) => {
    try {
      const response = await api.get(`/solicitudes/estudiante/${estudianteId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener solicitudes del estudiante:", error);
      throw error;
    }
  },

  getSolicitudesPorTutor: async (tutorId) => {
    try {
      const response = await api.get(`/tutores/${tutorId}/solicitudes`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener solicitudes del tutor:", error);
      throw error;
    }
  },

  createSolicitud: async (solicitud) => {
    try {
      const response = await api.post("/solicitudes", solicitud);
      return response.data;
    } catch (error) {
      console.error("Error al crear solicitud:", error);
      throw error;
    }
  },

  updateSolicitud: async (id, solicitud) => {
    try {
      const response = await api.put(`/solicitudes/${id}`, solicitud);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar solicitud:", error);
      throw error;
    }
  },

  deleteSolicitud: async (id) => {
    try {
      await api.delete(`/solicitudes/${id}`);
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
      throw error;
    }
  },

  cambiarEstadoSolicitud: async (solicitudId, nuevoEstado) => {
    try {
      const response = await api.patch(
        `/solicitudes/${solicitudId}/estado`,
        {},
        { params: { estado: nuevoEstado } }
      );
      return response.data;
    } catch (error) {
      console.error("Error al cambiar estado de solicitud:", error);
      throw error;
    }
  },
};

export const estadisticaService = {
  getSolicitudes: async () => {
    try {
      const response = await api.get("/solicitudes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
      throw error;
    }
  },
};

export const auditService = {
  getLogsByTable: async (tabla) => {
    try {
      const response = await api.get(API_ENDPOINTS.audit.byTable(tabla));
      return response.data;
    } catch (error) {
      console.error("Error al obtener logs por tabla:", error);
      throw error;
    }
  },

  getLogsByUser: async (userId) => {
    try {
      const response = await api.get(API_ENDPOINTS.audit.byUser(userId));
      return response.data;
    } catch (error) {
      console.error("Error al obtener logs por usuario:", error);
      throw error;
    }
  },

  getLogsByUser: async (userId) => {
    const response = await api.get(API_ENDPOINTS.audit.byUser(userId));
    return response.data;
  },
};

// Servicio de usuarios
export const usuarioService = {
  getUsuarios: async () => {
    try {
      const response = await api.get("/usuarios");
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  getUsuariosPorRol: async (rol) => {
    try {
      if (!rol) {
        throw new Error("El rol es requerido");
      }
      const response = await api.get(`/usuarios/rol/${rol.toLowerCase()}`);
      if (!response.data) {
        throw new Error("No se recibieron datos del servidor");
      }
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios por rol:", error);
      if (error.response) {
        throw new Error(
          `Error del servidor: ${error.response.status} - ${
            error.response.data?.message || "Error desconocido"
          }`
        );
      } else if (error.request) {
        throw new Error("No se recibió respuesta del servidor");
      } else {
        throw new Error(`Error al realizar la petición: ${error.message}`);
      }
    }
  },

  crearUsuario: async (usuario) => {
    try {
      const response = await api.post("/usuarios", usuario);
      return response.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  },

  actualizarUsuario: async (id, usuarioActualizado) => {
    try {
      if (!usuarioActualizado || !usuarioActualizado.correo) {
        throw new Error("Correo de usuario no válido");
      }

      // Obtener todos los usuarios para encontrar el ID correcto
      const usuarios = await api.get("/usuarios");
      const usuarioActual = usuarios.data.find(
        (u) => u.correo === usuarioActualizado.correo
      );

      if (!usuarioActual) {
        throw new Error("No se pudo encontrar el usuario");
      }

      // Combinar los datos actuales con las actualizaciones
      const datosActualizados = {
        ...usuarioActual,
        ...usuarioActualizado,
        // Mantener la contraseña existente si no se proporciona una nueva
        contrasena: usuarioActualizado.contrasena || usuarioActual.contrasena,
        rol: usuarioActualizado.rol || usuarioActual.rol,
        carrera: usuarioActualizado.carrera || usuarioActual.carrera,
      };

      // Validar que los campos requeridos estén presentes
      if (
        !datosActualizados.nombre ||
        !datosActualizados.correo ||
        !datosActualizados.rol
      ) {
        throw new Error("Faltan campos requeridos");
      }

      const response = await api.put(
        `/usuarios/${usuarioActual.usuarioId}`,
        datosActualizados
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      if (error.response) {
        throw new Error(
          error.response.data?.message || "Error al actualizar usuario"
        );
      }
      throw error;
    }
  },

  eliminarUsuario: async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  },

  buscarUsuarios: async (nombre) => {
    try {
      const response = await api.get(`/usuarios/buscar?nombre=${nombre}`);
      return response.data;
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      throw error;
    }
  },
};

export default {
  authService,
  horarioService,
  solicitudService,
  feedbackService,
  estadisticaService,
  auditService,
  usuarioService,
};
