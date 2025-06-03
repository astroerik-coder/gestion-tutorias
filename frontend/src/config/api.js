export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Autenticación
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  
  // Usuarios
  users: {
    base: '/users',
    students: '/estudiantes',
    tutors: '/tutores',
    coordinators: '/coordinadores',
  },
  
  // Tutorías
  tutorials: {
    base: '/tutorials',
    requests: '/solicitudes',
    sessions: '/sesiones',
    schedule: '/horarios',
  },
  
  // Materias
  subjects: {
    base: '/subjects',
    list: '/materias',
  },
  
  // Estadísticas
  statistics: {
    base: '/statistics',
    tutors: '/estadisticas/tutores',
    subjects: '/estadisticas/materias',
  },

   // Auditoría
  audit: {
    byTable: (tabla) => `/logs/tabla?tabla=${tabla}`,
    byUser: (userId) => `/logs/usuario/${userId}`,
  },
};


export default API_ENDPOINTS; 