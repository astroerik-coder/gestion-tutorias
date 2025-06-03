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

// Añade este interceptor justo después de definir `api`
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token no encontrado. Inicie sesión nuevamente.");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Login
export const authService = {
  login: async (correo, contrasena) => {
    try {
      const response = await api.post("/usuarios/login", {
        correo,
        contrasena,
      });
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
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
  createHorario: async ({ fecha, horaInicio, horaFin }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) throw new Error("Usuario no encontrado");
    const payload = {
      tutor: { tutorId: usuario.usuarioId },
      fecha,
      horaInicio,
      horaFin,
    };
    const response = await api.post("/horarios", payload);
    return response.data;
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

  /* Obtener solicitudes propias */
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
      throw error;
    }
  },

  /* Funcional */
  createSolicitud: async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!token || !usuario) throw new Error("Token o usuario no encontrado");

      const solicitud = {
        materia: formData.materia,
        motivo: formData.motivo,
        estado: "Pendiente",
        estudiante: {
          estudianteId: usuario.usuarioId,
        },
        horario: {
          horarioId: formData.horario.horarioId || formData.horarioId,
        },
      };

      const response = await api.post("/solicitudes", solicitud);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSolicitudEstado: async (solicitud) => {
    try {
      const response = await api.put(
        `/solicitudes/${solicitud.solicitudId}`,
        solicitud
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar solicitud:", error);
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

export default {
  authService,
  horarioService,
  solicitudService,
  feedbackService,
  estadisticaService,
  auditService,
};
