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
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import RequestTutorialModal from "./modals/RequestTutorialModal";
import { Add as AddIcon } from "@mui/icons-material";
import { solicitudService, horarioService } from "../../services/api";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import esLocale from "date-fns/locale/es";

const StudentDashboard = () => {
  const [horarios, setHorarios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState(new Date());
  const [nuevaSolicitud, setNuevaSolicitud] = useState({
    materia: "",
    motivo: "",
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (usuario) {
      fetchHorarios();
      fetchSolicitudes();
    }
  }, [usuario, fechaFiltro]);

  const fetchHorarios = async () => {
    try {
      const data = await horarioService.getHorarios();
      setHorarios(data.filter(h => h.disponible));
    } catch (err) {
      setError("Error al cargar los horarios");
      console.error(err);
    }
  };

  const fetchSolicitudes = async () => {
    try {
      const data = await solicitudService.getSolicitudesPorEstudiante(usuario.usuarioId);
      setSolicitudes(data);
    } catch (err) {
      setError("Error al cargar las solicitudes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    const filteredRequests = solicitudes.filter(
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
      setSolicitudes(updated);
    } catch (err) {
      setSubmitError("Error al enviar la solicitud.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenDialog = (horario) => {
    setSelectedHorario(horario);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHorario(null);
    setNuevaSolicitud({
      materia: "",
      motivo: "",
    });
  };

  const handleCreateSolicitud = async () => {
    try {
      await solicitudService.createSolicitud({
        ...nuevaSolicitud,
        horario: selectedHorario,
      });
      handleCloseDialog();
      fetchSolicitudes();
    } catch (err) {
      setError("Error al crear la solicitud");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Horarios Disponibles"
              action={
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                  <DatePicker
                    label="Filtrar por fecha"
                    value={fechaFiltro}
                    onChange={(newValue) => setFechaFiltro(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              }
            />
            <CardContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <List>
                {horarios
                  .filter(h => new Date(h.fecha).toDateString() === fechaFiltro.toDateString())
                  .map((horario) => (
                    <React.Fragment key={horario.horarioId}>
                      <ListItem>
                        <ListItemText
                          primary={`Tutor: ${horario.tutor?.nombre || "No especificado"}`}
                          secondary={`Hora: ${horario.horaInicio} - ${horario.horaFin}`}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenDialog(horario)}
                        >
                          Reservar
                        </Button>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Mis Solicitudes" />
            <CardContent>
              <List>
                {solicitudes.map((solicitud) => (
                  <React.Fragment key={solicitud.solicitudId}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="subtitle1">
                              {solicitud.materia}
                            </Typography>
                            <Chip
                              label={solicitud.estado}
                              color={getStatusColor(solicitud.estado)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Tutor: {solicitud.tutorNombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Motivo: {solicitud.motivo}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Crear Nueva Solicitud</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Materia"
                  fullWidth
                  value={nuevaSolicitud.materia}
                  onChange={(e) =>
                    setNuevaSolicitud({ ...nuevaSolicitud, materia: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Motivo"
                  fullWidth
                  multiline
                  rows={4}
                  value={nuevaSolicitud.motivo}
                  onChange={(e) =>
                    setNuevaSolicitud({ ...nuevaSolicitud, motivo: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleCreateSolicitud}
            variant="contained"
            color="primary"
            disabled={!nuevaSolicitud.materia || !nuevaSolicitud.motivo}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentDashboard;
