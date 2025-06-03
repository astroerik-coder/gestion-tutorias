import axios from "axios";

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

  getHorarioById: async (horarioId) => {
    try {
      const response = await api.get(`/horarios/${horarioId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el horario por ID:", error);
      throw error;
    }
  },

  createHorario: async (horarioData) => {
    try {
      const response = await api.post("/horarios", horarioData);
      return response.data;
    } catch (error) {
      console.error("Error al crear horario:", error);
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

  createSolicitud: async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");
  
      const payload = JSON.parse(atob(token.split(".")[1]));
  
      const estudiante = {
        estudianteId: payload.id,
        carrera: payload.carrera || "",
        usuario: {
          usuarioId: payload.id,
          nombre: payload.nombre,
          correo: payload.sub,
          contrasena: "",
          rol: "estudiante",
        },
      };
  
      const horario = await horarioService.getHorarioById(formData.horarioId);
  
      const solicitud = {
        solicitudId: 0,
        materia: formData.subject,
        motivo: formData.reason,
        estado: "Pendiente",
        fechaSolicitud: new Date().toISOString(),
        estudiante,
        horario,
      };
  
      const response = await api.post("/solicitudes", solicitud);
      return response.data;
  
    } catch (error) {
      console.error("Error en createSolicitud:", error);
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

export default {
  authService,
  horarioService,
  solicitudService,
  feedbackService,
  estadisticaService,
};
