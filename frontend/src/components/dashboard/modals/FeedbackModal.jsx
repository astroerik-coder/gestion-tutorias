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
  Rating,
} from '@mui/material';

const FeedbackModal = ({ 
  open, 
  onClose, 
  session, 
  onSubmit 
}) => {
  const [form, setForm] = React.useState({
    rating: 0,
    comment: ''
  });

  const handleSubmit = () => {
    onSubmit(form);
    setForm({ rating: 0, comment: '' });
    onClose();
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
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          Calificar Sesión
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              {session?.materia}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tutor: {session?.tutorNombre}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Calificación
            </Typography>
            <Rating
              value={form.rating}
              onChange={(_, newValue) => {
                setForm(prev => ({ ...prev, rating: newValue }));
              }}
              precision={0.5}
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comentarios"
            value={form.comment}
            onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
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
          onClick={handleSubmit}
          disabled={!form.rating}
          sx={{ 
            px: 3,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Enviar Calificación
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal; 