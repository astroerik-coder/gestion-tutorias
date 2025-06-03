import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert as MuiAlert,
  TextField,
  Grid,
  MenuItem,
  InputAdornment,
  Chip,
  Paper,
  Divider,
  Checkbox,
  Pagination,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { solicitudService } from "../../../services/api";

const ITEMS_PER_PAGE = 5;

const ManageRequestsSection = ({
  requests,
  onAddRequest,
  onEstadoActualizado,
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [filtros, setFiltros] = useState({
    estado: "todos",
    materia: "",
    estudiante: "",
  });

  const [solicitudesFiltradas, setSolicitudesFiltradas] = useState(requests);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    filtrarSolicitudes();
  }, [filtros, requests]);

  const filtrarSolicitudes = () => {
    let resultado = [...requests];

    if (filtros.estado !== "todos") {
      resultado = resultado.filter(
        (s) => s.estado.toLowerCase() === filtros.estado.toLowerCase()
      );
    }

    if (filtros.materia) {
      resultado = resultado.filter((s) =>
        s.materia.toLowerCase().includes(filtros.materia.toLowerCase())
      );
    }

    if (filtros.estudiante) {
      resultado = resultado.filter((s) =>
        s.estudianteNombre.toLowerCase().includes(filtros.estudiante.toLowerCase())
      );
    }

    setSolicitudesFiltradas(resultado);
    setTotalPages(Math.ceil(resultado.length / ITEMS_PER_PAGE));
    setPage(1); // Resetear a la primera página cuando cambian los filtros
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChangeEstado = async (id, estado) => {
    try {
      await solicitudService.cambiarEstadoSolicitud(id, estado);
      setSnackbar({
        open: true,
        message: `Solicitud ${estado.toLowerCase()} correctamente.`,
        severity: "success",
      });
      if (onEstadoActualizado) onEstadoActualizado();
    } catch (error) {
      console.error("Error cambiando el estado:", error);
      setSnackbar({
        open: true,
        message: "No se pudo cambiar el estado de la solicitud.",
        severity: "error",
      });
    }
  };

  const handleChangeEstadoMasivo = async (estado) => {
    try {
      const promises = selectedRequests.map((id) =>
        solicitudService.cambiarEstadoSolicitud(id, estado)
      );
      await Promise.all(promises);
      setSnackbar({
        open: true,
        message: `${selectedRequests.length} solicitudes ${estado.toLowerCase()} correctamente.`,
        severity: "success",
      });
      setSelectedRequests([]);
      if (onEstadoActualizado) onEstadoActualizado();
    } catch (error) {
      console.error("Error cambiando estados:", error);
      setSnackbar({
        open: true,
        message: "Error al cambiar los estados de las solicitudes.",
        severity: "error",
      });
    }
  };

  const handleSelectRequest = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id)
        ? prev.filter((requestId) => requestId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = paginatedSolicitudes
      .filter((s) => s.estado === "Pendiente")
      .map((s) => s.idSolicitud);
    
    if (selectedRequests.length === currentPageIds.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(currentPageIds);
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

  const paginatedSolicitudes = solicitudesFiltradas.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <Card sx={{ backgroundColor: "background.paper", mb: 3 }}>
        <CardContent>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Estado"
                  value={filtros.estado}
                  onChange={(e) =>
                    setFiltros({ ...filtros, estado: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="pendiente">Pendiente</MenuItem>
                  <MenuItem value="aprobada">Aprobada</MenuItem>
                  <MenuItem value="rechazada">Rechazada</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Buscar por materia"
                  value={filtros.materia}
                  onChange={(e) =>
                    setFiltros({ ...filtros, materia: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Buscar por estudiante"
                  value={filtros.estudiante}
                  onChange={(e) =>
                    setFiltros({ ...filtros, estudiante: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleChangeEstadoMasivo("Aprobada")}
                    disabled={selectedRequests.length === 0}
                  >
                    Aprobar Seleccionados
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleChangeEstadoMasivo("Rechazada")}
                    disabled={selectedRequests.length === 0}
                  >
                    Rechazar Seleccionados
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          <List>
            {paginatedSolicitudes.map((request) => (
              <Paper
                key={request.idSolicitud}
                elevation={1}
                sx={{ mb: 2, borderRadius: 2 }}
              >
                <ListItem
                  sx={{
                    py: 2,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {request.estado === "Pendiente" && (
                    <Checkbox
                      checked={selectedRequests.includes(request.idSolicitud)}
                      onChange={() => handleSelectRequest(request.idSolicitud)}
                      sx={{ mr: 1 }}
                    />
                  )}
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {request.materia?.charAt(0) || "?"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1">
                          {request.materia}
                        </Typography>
                        <Chip
                          label={request.estado}
                          color={getStatusColor(request.estado)}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                        >
                          Estudiante: {request.estudianteNombre}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                        >
                          Docente: {request.tutorNombre}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                        >
                          Horario: {request.horario?.horaInicio} -{" "}
                          {request.horario?.horaFin}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Motivo: {request.motivo}
                        </Typography>
                      </>
                    }
                  />
                  {request.estado === "Pendiente" && (
                    <Box>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() =>
                          handleChangeEstado(request.idSolicitud, "Aprobada")
                        }
                        sx={{ mr: 1 }}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          handleChangeEstado(request.idSolicitud, "Rechazada")
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </ListItem>
              </Paper>
            ))}
          </List>

          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ManageRequestsSection;
