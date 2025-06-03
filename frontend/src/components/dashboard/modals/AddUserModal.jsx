import React from 'react';
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
} from '@mui/material';

const AddUserModal = ({
  open = false,
  onClose = () => {},
  form = {
    name: "",
    email: "",
    role: "",
    password: "",
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
              value={form.name}
              onChange={handleChange("name")}
              required
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              required
              fullWidth
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Rol</InputLabel>
              <Select
                value={form.role}
                onChange={handleChange("role")}
                label="Rol"
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="tutor">Tutor</MenuItem>
                <MenuItem value="coordinador">Coordinador</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              required
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            variant="contained" 
            sx={{ 
              px: 3,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Crear Usuario
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserModal; 