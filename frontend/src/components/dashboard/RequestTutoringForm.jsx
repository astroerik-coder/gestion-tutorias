import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { solicitudService, horarioService } from "../../services/api";

const RequestTutoringForm = () => {
  const [formData, setFormData] = useState({
    materia: "",
    motivo: "",
    horarioId: "",
  });
  const [horarios, setHorarios] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadHorarios();
  }, []);

  const loadHorarios = async () => {
    try {
      const horariosData = await horarioService.getHorarios();
      setHorarios(horariosData);
    } catch (error) {
      setError("Error al cargar los horarios disponibles");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await solicitudService.createSolicitud(formData);
      setSuccess(true);
      setFormData({
        materia: "",
        motivo: "",
        horarioId: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError("Error al crear la solicitud");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Solicitar Tutoría
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Solicitud creada exitosamente
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Materia"
          name="materia"
          value={formData.materia}
          onChange={handleChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Motivo"
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          required
          multiline
          rows={4}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Horario Preferido</InputLabel>
          <Select
            name="horarioId"
            value={formData.horarioId}
            onChange={handleChange}
            required
            label="Horario Preferido"
          >
            {horarios.map((horario) => (
              <MenuItem key={horario.id} value={horario.id}>
                {`${horario.fecha} - ${horario.horaInicio.slice(
                  0,
                  5
                )} a ${horario.horaFin.slice(0, 5)} - ${horario.tutorNombre}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Solicitar Tutoría
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RequestTutoringForm;
