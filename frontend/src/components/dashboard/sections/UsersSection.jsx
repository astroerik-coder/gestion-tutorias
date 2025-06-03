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
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { usuarioService } from "../../../services/api";

const ITEMS_PER_PAGE = 10;

const UsersSection = ({
  onAddUser,
  onEditUser,
  onDeleteUser,
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [filtros, setFiltros] = useState({
    busqueda: "",
    rol: "todos",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    usuarioId: "",
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "",
    carrera: "",
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    filtrarUsuarios();
  }, [filtros, usuarios]);

  const cargarUsuarios = async () => {
    try {
      const data = await usuarioService.getUsuarios();
      setUsuarios(data);
      setUsuariosFiltrados(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (error) {
      mostrarSnackbar("Error al cargar usuarios", "error");
    }
  };

  const filtrarUsuarios = () => {
    let resultado = [...usuarios];

    if (filtros.busqueda) {
      resultado = resultado.filter(
        (u) =>
          u.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          u.correo.toLowerCase().includes(filtros.busqueda.toLowerCase())
      );
    }

    if (filtros.rol !== "todos") {
      resultado = resultado.filter(
        (u) => u.rol.toLowerCase() === filtros.rol.toLowerCase()
      );
    }

    setUsuariosFiltrados(resultado);
    setTotalPages(Math.ceil(resultado.length / ITEMS_PER_PAGE));
    setPage(1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const mostrarSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleEditClick = (usuario) => {
    console.log("Usuario seleccionado:", usuario);
    setSelectedUser(usuario);
    setEditForm({
      usuarioId: usuario.usuarioId,
      nombre: usuario.nombre,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      rol: usuario.rol,
      carrera: usuario.carrera || "",
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (usuarioId) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        await usuarioService.eliminarUsuario(usuarioId);
        mostrarSnackbar("Usuario eliminado exitosamente");
        cargarUsuarios();
      } catch (error) {
        mostrarSnackbar("Error al eliminar usuario", "error");
      }
    }
  };

  const handleEditSubmit = async () => {
    if (!editForm.correo) {
      mostrarSnackbar("Error: El correo es requerido", "error");
      return;
    }

    try {
      console.log("Enviando actualización:", editForm);
      await usuarioService.actualizarUsuario(null, editForm);
      mostrarSnackbar("Usuario actualizado exitosamente");
      setEditDialogOpen(false);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      mostrarSnackbar(
        error.message || "Error al actualizar usuario",
        "error"
      );
    }
  };

  const getRolColor = (rol) => {
    switch (rol?.toLowerCase()) {
      case "estudiante":
        return "primary";
      case "tutor":
        return "success";
      case "coordinador":
        return "warning";
      default:
        return "default";
    }
  };

  const paginatedUsuarios = usuariosFiltrados.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <Card sx={{ backgroundColor: "background.paper", mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Gestión de Usuarios</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddUser}
            >
              Agregar Usuario
            </Button>
          </Box>

          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Buscar usuarios"
                  value={filtros.busqueda}
                  onChange={(e) =>
                    setFiltros({ ...filtros, busqueda: e.target.value })
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Filtrar por rol</InputLabel>
                  <Select
                    value={filtros.rol}
                    onChange={(e) =>
                      setFiltros({ ...filtros, rol: e.target.value })
                    }
                    label="Filtrar por rol"
                  >
                    <MenuItem value="todos">Todos los roles</MenuItem>
                    <MenuItem value="estudiante">Estudiantes</MenuItem>
                    <MenuItem value="tutor">Tutores</MenuItem>
                    <MenuItem value="coordinador">Coordinadores</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <List>
            {paginatedUsuarios.map((usuario) => (
              <Paper
                key={usuario.id}
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
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {usuario.nombre?.charAt(0) || "U"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="subtitle1">{usuario.nombre}</Typography>
                        <Chip
                          label={usuario.rol?.charAt(0).toUpperCase() + usuario.rol?.slice(1)}
                          size="small"
                          color={getRolColor(usuario.rol)}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {usuario.correo}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {usuario.carrera || "Sin carrera asignada"}
                        </Typography>
                      </>
                    }
                  />
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(usuario)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(usuario.usuarioId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
              showFirstButton
              showLastButton
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Nombre"
              value={editForm.nombre}
              onChange={(e) =>
                setEditForm({ ...editForm, nombre: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              value={editForm.correo}
              onChange={(e) =>
                setEditForm({ ...editForm, correo: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Contraseña"
              type="password"
              value={editForm.contrasena}
              onChange={(e) =>
                setEditForm({ ...editForm, contrasena: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                value={editForm.rol}
                onChange={(e) =>
                  setEditForm({ ...editForm, rol: e.target.value })
                }
                label="Rol"
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="tutor">Tutor</MenuItem>
                <MenuItem value="coordinador">Coordinador</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Carrera"
              value={editForm.carrera}
              onChange={(e) =>
                setEditForm({ ...editForm, carrera: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

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

export default UsersSection; 