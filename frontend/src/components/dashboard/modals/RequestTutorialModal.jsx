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
} from "@mui/material";
import {
  horarioService,
  solicitudService,
  authService,
} from "../../../services/api";

const RequestTutorialModal = ({ open, onClose, onSubmit }) => {
  const [localForm, setLocalForm] = useState({
    subject: "",
    reason: "",
    horarioId: "",
  });
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      horarioService
        .getHorarios()
        .then(setHorarios)
        .catch((err) => setError("Error al cargar horarios disponibles"))
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!localForm.horarioId || !localForm.subject || !localForm.reason) return;

    try {
      const horario = await horarioService.getHorarioById(localForm.horarioId);
      const estudiante = await authService.getCurrentUser(); // Decodificado desde JWT

      const solicitudPayload = {
        materia: localForm.subject,
        motivo: localForm.reason,
        estado: "Pendiente",
        fechaSolicitud: new Date().toISOString(),
        estudiante: estudiante,
        horario: horario,
      };

      await solicitudService.createSolicitud(solicitudPayload);
      onSubmit?.();
      setLocalForm({ subject: "", reason: "", horarioId: "" });
      onClose();
    } catch (err) {
      console.error("Error al enviar solicitud:", err);
      setError(
        "No se pudo enviar la solicitud. Verifique su sesión o intente nuevamente."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          Solicitar Tutoría
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Materia</InputLabel>
            <Select
              value={localForm.subject}
              label="Materia"
              onChange={(e) =>
                setLocalForm((prev) => ({ ...prev, subject: e.target.value }))
              }
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
            label="Motivo de la solicitud"
            value={localForm.reason}
            onChange={(e) =>
              setLocalForm((prev) => ({ ...prev, reason: e.target.value }))
            }
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Horario disponible</InputLabel>
            <Select
              value={localForm.horarioId}
              label="Horario disponible"
              onChange={(e) =>
                setLocalForm((prev) => ({ ...prev, horarioId: e.target.value }))
              }
            >
              {horarios.map((h) => (
                <MenuItem key={h.horarioId} value={h.horarioId}>
                  {h.fecha} {h.horaInicio} - {h.horaFin} (Tutor:{" "}
                  {h.tutor?.nombre})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !localForm.subject || !localForm.reason || !localForm.horarioId
          }
          sx={{ px: 3, "&:hover": { backgroundColor: "primary.dark" } }}
        >
          Enviar Solicitud
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestTutorialModal;
