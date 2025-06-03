import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { horarioService } from '../../services/api';

const PublishScheduleForm = () => {
  const [formData, setFormData] = useState({
    fecha: null,
    horaInicio: null,
    horaFin: null,
  });
  const [horariosExistentes, setHorariosExistentes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadHorariosExistentes();
  }, []);

  const loadHorariosExistentes = async () => {
    try {
      const horarios = await horarioService.getHorarios();
      setHorariosExistentes(horarios);
    } catch (error) {
      setError('Error al cargar los horarios existentes');
    }
  };

  const validarSolapamiento = (nuevaFecha, nuevaHoraInicio, nuevaHoraFin) => {
    // Convertir las horas a minutos para facilitar la comparación
    const convertirHoraAMinutos = (hora) => {
      const [horas, minutos] = hora.split(':').map(Number);
      return horas * 60 + minutos;
    };

    const nuevaHoraInicioMinutos = convertirHoraAMinutos(nuevaHoraInicio);
    const nuevaHoraFinMinutos = convertirHoraAMinutos(nuevaHoraFin);

    // Verificar que la hora de inicio sea menor que la hora de fin
    if (nuevaHoraInicioMinutos >= nuevaHoraFinMinutos) {
      return 'La hora de inicio debe ser anterior a la hora de fin';
    }

    // Verificar solapamiento con horarios existentes
    const solapamiento = horariosExistentes.some(horario => {
      if (horario.fecha !== nuevaFecha) return false;

      const horarioInicioMinutos = convertirHoraAMinutos(horario.horaInicio);
      const horarioFinMinutos = convertirHoraAMinutos(horario.horaFin);

      return (
        (nuevaHoraInicioMinutos >= horarioInicioMinutos && nuevaHoraInicioMinutos < horarioFinMinutos) ||
        (nuevaHoraFinMinutos > horarioInicioMinutos && nuevaHoraFinMinutos <= horarioFinMinutos) ||
        (nuevaHoraInicioMinutos <= horarioInicioMinutos && nuevaHoraFinMinutos >= horarioFinMinutos)
      );
    });

    if (solapamiento) {
      return 'Ya existe un horario asignado en este período';
    }

    return null;
  };

  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null); // Limpiar error al cambiar los valores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const fecha = formData.fecha.toISOString().split('T')[0];
      const horaInicio = formData.horaInicio.toTimeString().slice(0, 8);
      const horaFin = formData.horaFin.toTimeString().slice(0, 8);

      // Validar solapamiento
      const errorValidacion = validarSolapamiento(fecha, horaInicio, horaFin);
      if (errorValidacion) {
        setError(errorValidacion);
        return;
      }

      await horarioService.createHorario({
        tutorId: 11, // Por ahora hardcodeado, luego se obtendrá del usuario logueado
        fecha,
        horaInicio,
        horaFin,
      });

      setSuccess(true);
      setFormData({
        fecha: null,
        horaInicio: null,
        horaFin: null,
      });
      setTimeout(() => setSuccess(false), 3000);
      
      // Recargar los horarios existentes
      await loadHorariosExistentes();
    } catch (error) {
      setError('Error al publicar el horario');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Publicar Horario Disponible
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Horario publicado exitosamente
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <DatePicker
            label="Fecha"
            value={formData.fecha}
            onChange={handleChange('fecha')}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TimePicker
            label="Hora de Inicio"
            value={formData.horaInicio}
            onChange={handleChange('horaInicio')}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TimePicker
            label="Hora de Fin"
            value={formData.horaFin}
            onChange={handleChange('horaFin')}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!formData.fecha || !formData.horaInicio || !formData.horaFin}
        >
          Publicar Horario
        </Button>
      </form>
    </Paper>
  );
};

export default PublishScheduleForm;
