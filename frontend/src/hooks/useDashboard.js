import { useState, useEffect } from "react";
import { horarioService, solicitudService } from "../services/api";

export const useDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [userTab, setUserTab] = useState(0);

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

  // Estados para datos
  const [requests, setRequests] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar solicitudes
        const requestsData = await solicitudService.getSolicitudes();
        setRequests(requestsData);

        // Cargar horarios
        const horariosData = await horarioService.getHorarios();
        setHorarios(horariosData);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    userTab,
    setUserTab,

    // Formularios
    requestForm,
    setRequestForm,
    scheduleForm,
    setScheduleForm,

    // Datos
    requests,
    horarios,
    loading,
    error,

    // Handlers
    handleRequestSubmit,
    handleScheduleSubmit,
    handleRequestStatus,
  };
};
