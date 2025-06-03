import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { horarioService, solicitudService } from "../../services/api";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import esLocale from "date-fns/locale/es";

const TutorDashboard = () => {
  const [horarios, setHorarios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoHorario, setNuevoHorario] = useState({
    fecha: new Date(),
    horaInicio: new Date(),
    horaFin: new Date(),
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (usuario) {
      fetchHorarios();
      fetchSolicitudes();
    }
  }, [usuario]);

  const fetchHorarios = async () => {
    try {
      const data = await horarioService.getHorarios();
      setHorarios(data.filter(h => h.tutor?.tutorId === usuario.usuarioId));
    } catch (err) {
      setError("Error al cargar los horarios");
      console.error(err);
    }
  };

  const fetchSolicitudes = async () => {
    try {
      const data = await solicitudService.getSolicitudesPorTutor(usuario.usuarioId);
      setSolicitudes(data);
    } catch (err) {
      setError("Error al cargar las solicitudes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNuevoHorario({
      fecha: new Date(),
      horaInicio: new Date(),
      horaFin: new Date(),
    });
  };

  const handleCreateHorario = async () => {
    try {
      await horarioService.createHorario({
        fecha: nuevoHorario.fecha,
        horaInicio: nuevoHorario.horaInicio,
        horaFin: nuevoHorario.horaFin,
      });
      handleCloseDialog();
      fetchHorarios();
    } catch (err) {
      setError("Error al crear el horario");
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Mis Horarios"
            action={
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Nuevo Horario
              </Button>
            }
          />
          <CardContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <List>
              {horarios.map((horario) => (
                <React.Fragment key={horario.horarioId}>
                  <ListItem>
                    <ListItemText
                      primary={`Fecha: ${new Date(horario.fecha).toLocaleDateString()}`}
                      secondary={`Hora: ${horario.horaInicio} - ${horario.horaFin}`}
                    />
                    <Chip
                      label={horario.disponible ? "Disponible" : "No Disponible"}
                      color={horario.disponible ? "success" : "error"}
                    />
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
          <CardHeader title="Solicitudes Recibidas" />
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
                            Estudiante: {solicitud.estudianteNombre}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Crear Nuevo Horario</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DatePicker
                    label="Fecha"
                    value={nuevoHorario.fecha}
                    onChange={(newValue) =>
                      setNuevoHorario({ ...nuevoHorario, fecha: newValue })
                    }
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    label="Hora Inicio"
                    value={nuevoHorario.horaInicio}
                    onChange={(newValue) =>
                      setNuevoHorario({ ...nuevoHorario, horaInicio: newValue })
                    }
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    label="Hora Fin"
                    value={nuevoHorario.horaFin}
                    onChange={(newValue) =>
                      setNuevoHorario({ ...nuevoHorario, horaFin: newValue })
                    }
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCreateHorario} variant="contained" color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default TutorDashboard;
