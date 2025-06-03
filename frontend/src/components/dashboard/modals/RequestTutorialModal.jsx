import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import { horarioService, solicitudService } from "../../../services/api";
import { toast } from "react-toastify";

const RequestTutorialModal = ({ open, onClose, onSubmit }) => {
  const initialForm = {
    subject: "",
    reason: "",
    horarioId: "",
  };

  const [localForm, setLocalForm] = useState(initialForm);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setLocalForm(initialForm);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      horarioService
        .getHorarios()
        .then((horarios) => {
          const now = new Date();
          const disponibles = horarios.filter((h) => {
            const fechaHora = new Date(`${h.fecha}T${h.horaInicio}`);
            return fechaHora > now;
          });
          setHorariosDisponibles(disponibles);
        })
        .catch((err) => {
          toast.error("Error al cargar horarios disponibles");
          console.error("Error fetching schedules:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!localForm.horarioId || !localForm.subject || !localForm.reason) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    setLoading(true);
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const estudianteId = usuario?.usuarioId;

      const solicitudData = {
        materia: localForm.subject,
        motivo: localForm.reason,
        estado: "Pendiente",
        estudiante: {
          estudianteId: estudianteId,
        },
        horario: {
          horarioId: localForm.horarioId,
        },
      };

      await solicitudService.createSolicitud(solicitudData);

      toast.success("Solicitud enviada exitosamente");
      onSubmit?.();
      setLocalForm(initialForm);
      onClose();
    } catch (err) {
      toast.error("Error al enviar la solicitud");
      console.error("Error submitting request:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const safeValue =
      name === "horarioId" ? (value === "" ? "" : parseInt(value, 10)) : value;

    setLocalForm((prev) => ({
      ...prev,
      [name]: safeValue,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle component="div" sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={600} component="span">
          Solicitar Tutoría
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="subject-label">Materia</InputLabel>
            <Select
              labelId="subject-label"
              name="subject"
              value={localForm.subject}
              label="Materia"
              onChange={handleChange}
              disabled={loading}
            >
              <MenuItem value="matematicas">Matemáticas</MenuItem>
              <MenuItem value="fisica">Física</MenuItem>
              <MenuItem value="quimica">Química</MenuItem>
              <MenuItem value="programacion">Programación</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            name="reason"
            label="Motivo de la solicitud"
            value={localForm.reason}
            onChange={handleChange}
            sx={{ mb: 3 }}
            disabled={loading}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="horario-label">Horario disponible</InputLabel>
            <Select
              labelId="horario-label"
              name="horarioId"
              value={localForm.horarioId}
              label="Horario disponible"
              onChange={handleChange}
              disabled={loading || horariosDisponibles.length === 0}
            >
              {horariosDisponibles.length === 0 ? (
                <MenuItem disabled>
                  {loading
                    ? "Cargando horarios..."
                    : "No hay horarios disponibles"}
                </MenuItem>
              ) : (
                horariosDisponibles.map((h) => (
                  <MenuItem key={h.horarioId} value={h.horarioId}>
                    {new Date(h.fecha).toLocaleDateString()}{" "}
                    {h.horaInicio.substring(0, 5)} - {h.horaFin.substring(0, 5)}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { backgroundColor: "action.hover" },
          }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            loading ||
            !localForm.subject ||
            !localForm.reason ||
            !localForm.horarioId
          }
          sx={{ px: 3, "&:hover": { backgroundColor: "primary.dark" } }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Enviar Solicitud"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestTutorialModal;
