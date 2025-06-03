import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const PublishScheduleModal = ({ 
  open, 
  onClose, 
  form, 
  onFormChange, 
  onSubmit 
}) => {
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
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          Publicar Horario de Disponibilidad
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Materia</InputLabel>
            <Select
              value={form.subject}
              onChange={(e) => onFormChange({ ...form, subject: e.target.value })}
              label="Materia"
            >
              <MenuItem value="matematicas">Matemáticas</MenuItem>
              <MenuItem value="fisica">Física</MenuItem>
              <MenuItem value="quimica">Química</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Día</InputLabel>
            <Select
              value={form.day}
              onChange={(e) => onFormChange({ ...form, day: e.target.value })}
              label="Día"
            >
              <MenuItem value="lunes">Lunes</MenuItem>
              <MenuItem value="miercoles">Miércoles</MenuItem>
              <MenuItem value="viernes">Viernes</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Hora</InputLabel>
            <Select
              value={form.time}
              onChange={(e) => onFormChange({ ...form, time: e.target.value })}
              label="Hora"
            >
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="number"
            label="Cupos disponibles"
            value={form.slots}
            onChange={(e) => onFormChange({ ...form, slots: e.target.value })}
            InputProps={{ inputProps: { min: 1, max: 10 } }}
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
          variant="contained" 
          onClick={onSubmit}
          sx={{ 
            px: 3,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Publicar Horario
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishScheduleModal; 