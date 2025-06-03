import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Button,
} from "@mui/material";
import RequestTutorialModal from "./modals/RequestTutorialModal";
import { Add as AddIcon } from "@mui/icons-material";
import { solicitudService } from "../../services/api";

const StudentDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const id = usuario?.usuarioId;

        if (!id)
          throw new Error("ID de estudiante no encontrado en localStorage");

        const solicitudes = await solicitudService.getSolicitudesPorEstudiante(
          id
        );
        setRequests(solicitudes);
      } catch (err) {
        console.error("Error al cargar solicitudes:", err);
        setError("Error al cargar solicitudes");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "aprobada":
        return "success";
      case "pendiente":
        return "warning";
      case "rechazada":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderRequestCard = (request) => (
    <Card key={request.solicitudId || Math.random()} sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography variant="h6">
            {request.materia || "Sin materia"}
          </Typography>
          <Chip
            label={request.estado || "Sin estado"}
            color={getStatusColor(request.estado)}
            size="small"
          />
        </Box>
        <Typography color="text.secondary" gutterBottom>
          {formatDate(request.fechaSolicitud)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Motivo: {request.motivo || "No especificado"}
        </Typography>
        {request.horario && (
          <Typography variant="body2">
            Horario: {request.horario.horaInicio} - {request.horario.horaFin}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const renderKanbanColumn = (status, title, color) => {
    const filteredRequests = requests.filter(
      (request) => request?.estado?.toLowerCase() === status.toLowerCase()
    );

    return (
      <Grid item xs={12} md={4}>
        <Paper className="kanban-column" sx={{ p: 2, height: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: `${color}.main`, fontWeight: 600, mb: 2 }}
          >
            {title} ({filteredRequests.length})
          </Typography>
          <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {loading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={24} />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : filteredRequests.length > 0 ? (
              filteredRequests.map(renderRequestCard)
            ) : (
              <Typography color="text.secondary">
                No hay solicitudes {title.toLowerCase()}.
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    );
  };

  const handleSubmitSolicitud = async (formData) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await solicitudService.createSolicitud({
        materia: formData.subject,
        motivo: formData.reason,
        horario: { horarioId: formData.horarioId },
      });
      setIsModalOpen(false);
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const updated = await solicitudService.getSolicitudesPorEstudiante(
        usuario.usuarioId
      );
      setRequests(updated);
    } catch (err) {
      setSubmitError("Error al enviar la solicitud.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="dashboard-container">
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Dashboard del Estudiante</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
        >
          Solicitar Tutoría
        </Button>
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Solicitudes de Tutoría
            </Typography>
            <Grid container spacing={2}>
              {renderKanbanColumn("pendiente", "Pendientes", "warning")}
              {renderKanbanColumn("aprobada", "Aprobadas", "success")}
              {renderKanbanColumn("rechazada", "Rechazadas", "error")}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <RequestTutorialModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitSolicitud}
        loading={submitting}
      />
    </Box>
  );
};

export default StudentDashboard;
