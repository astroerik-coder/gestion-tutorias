import { useState, useEffect } from "react";
import {
  horarioService,
  solicitudService,
  auditService,
  usuarioService,
} from "../services/api";

export const useDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [userTab, setUserTab] = useState("estudiante");
  const [recentActivity, setRecentActivity] = useState([]);

  // Estado para formularios
  const [requestForm, setRequestForm] = useState({
    materia: "",
    motivo: "",
    horarioId: "",
  });

  const [scheduleForm, setScheduleForm] = useState({
    fecha: null,
    horaInicio: null,
    horaFin: null,
  });

  const [userForm, setUserForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "",
    carrera: "",
  });

  // Estados para datos
  const [requests, setRequests] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamadas simultáneas a solicitudes, horarios y logs
        const [requestsData, horariosData, logsData] = await Promise.all([
          solicitudService.getSolicitudes(),
          horarioService.getHorarios(),
          auditService.getLogsByTable("solicitud"),
        ]);

        setRequests(requestsData);
        setHorarios(horariosData);

        const parsedLogs = logsData.map((log) => ({
          id: log.logId,
          subject: `${log.usuario.nombre} - ${log.accion}`,
          status: log.descripcion,
          date: log.fecha,
        }));

        setRecentActivity(parsedLogs);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cargar usuarios cuando cambia el tab
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const data = await usuarioService.getUsuariosPorRol(userTab);
        setUsuarios(data);
      } catch (err) {
        setError("Error al cargar los usuarios");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === "users") {
      fetchUsuarios();
    }
  }, [userTab, activeSection]);

  // Handlers
  const handleRequestSubmit = async () => {
    try {
      const newRequest = await solicitudService.createSolicitud(requestForm);
      setRequests([newRequest, ...requests]);
      setRequestForm({ materia: "", motivo: "", horarioId: "" });
      setRequestDialogOpen(false);
    } catch (err) {
      setError("Error al crear la solicitud");
      console.error("Error:", err);
    }
  };

  const handleScheduleSubmit = async () => {
    try {
      const newSchedule = await horarioService.createHorario({
        tutorId: 11, // Por ahora hardcodeado
        fecha: scheduleForm.fecha.toISOString().split("T")[0],
        horaInicio: scheduleForm.horaInicio.toTimeString().slice(0, 8),
        horaFin: scheduleForm.horaFin.toTimeString().slice(0, 8),
      });

      setHorarios([newSchedule, ...horarios]);
      setScheduleForm({ fecha: null, horaInicio: null, horaFin: null });
      setScheduleDialogOpen(false);
    } catch (err) {
      setError("Error al crear el horario");
      console.error("Error:", err);
    }
  };

  const handleUserSubmit = async () => {
    try {
      const newUser = await usuarioService.crearUsuario(userForm);
      setUsuarios([newUser, ...usuarios]);
      setUserForm({
        nombre: "",
        correo: "",
        contrasena: "",
        rol: "",
        carrera: "",
      });
      setAddUserDialogOpen(false);
    } catch (err) {
      setError("Error al crear el usuario");
      console.error("Error:", err);
    }
  };

  const handleRequestStatus = async (requestId, newStatus) => {
    try {
      const updatedRequest = await solicitudService.updateSolicitudEstado(
        requestId,
        newStatus
      );
      setRequests(
        requests.map((request) =>
          request.id === requestId ? updatedRequest : request
        )
      );
    } catch (err) {
      setError("Error al actualizar el estado de la solicitud");
      console.error("Error:", err);
    }
  };

  return {
    // Estado UI
    sidebarOpen,
    setSidebarOpen,
    activeSection,
    setActiveSection,
    requestDialogOpen,
    setRequestDialogOpen,
    scheduleDialogOpen,
    setScheduleDialogOpen,
    selectedSession,
    setSelectedSession,
    addUserDialogOpen,
    setAddUserDialogOpen,
    userTab,
    setUserTab,

    // Formularios
    requestForm,
    setRequestForm,
    scheduleForm,
    setScheduleForm,
    userForm,
    setUserForm,

    // Datos
    recentActivity,
    requests,
    horarios,
    usuarios,
    loading,
    error,

    // Handlers
    handleRequestSubmit,
    handleScheduleSubmit,
    handleUserSubmit,
    handleRequestStatus,
  };
};
