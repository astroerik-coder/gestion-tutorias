import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddUserModal = ({
  open = false,
  onClose = () => {},
  form = {
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "",
    carrera: "",
  },
  onFormChange = () => {},
  onSubmit = () => {},
}) => {
  const handleChange = (field) => (event) => {
    onFormChange({
      ...form,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            Agregar Nuevo Usuario
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Nombre"
              value={form.nombre}
              onChange={handleChange("nombre")}
              required
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              value={form.correo}
              onChange={handleChange("correo")}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                value={form.rol}
                onChange={handleChange("rol")}
                label="Rol"
                required
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="tutor">Tutor</MenuItem>
                <MenuItem value="coordinador">Coordinador</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Contraseña"
              type="password"
              value={form.contrasena}
              onChange={handleChange("contrasena")}
              required
              fullWidth
            />
            <TextField
              label="Carrera"
              value={form.carrera}
              onChange={handleChange("carrera")}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Agregar Usuario
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserModal;
