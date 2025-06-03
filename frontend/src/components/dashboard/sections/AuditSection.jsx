// src/components/dashboard/sections/AuditSection.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Box,
  TextField,
  Grid,
  InputAdornment,
  Paper,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ITEMS_PER_PAGE = 10;

const AuditSection = ({ activities }) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    accion: 'todos',
    fecha: '',
  });

  const [actividadesFiltradas, setActividadesFiltradas] = useState(activities);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    filtrarActividades();
  }, [filtros, activities]);

  const filtrarActividades = () => {
    let resultado = [...activities];

    if (filtros.busqueda) {
      resultado = resultado.filter(
        (a) =>
          a.usuario?.nombre?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          a.descripcion?.toLowerCase().includes(filtros.busqueda.toLowerCase())
      );
    }

    if (filtros.accion !== 'todos') {
      resultado = resultado.filter(
        (a) => a.accion?.toLowerCase() === filtros.accion.toLowerCase()
      );
    }

    if (filtros.fecha) {
      const fechaFiltro = new Date(filtros.fecha).toLocaleDateString();
      resultado = resultado.filter(
        (a) => new Date(a.fecha).toLocaleDateString() === fechaFiltro
      );
    }

    setActividadesFiltradas(resultado);
    setTotalPages(Math.ceil(resultado.length / ITEMS_PER_PAGE));
    setPage(1);
  };

  const getAccionColor = (accion) => {
    switch (accion?.toLowerCase()) {
      case 'insert':
        return 'success';
      case 'update':
        return 'info';
      case 'delete':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAccionLabel = (accion) => {
    switch (accion?.toLowerCase()) {
      case 'insert':
        return 'Creación';
      case 'update':
        return 'Actualización';
      case 'delete':
        return 'Eliminación';
      default:
        return accion;
    }
  };

  const paginatedActividades = actividadesFiltradas.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Card sx={{ backgroundColor: 'background.paper' }}>
      <CardHeader 
        title="Auditoría del Sistema" 
        subheader="Registro de actividades del sistema"
      />
      <CardContent>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Buscar"
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filtrar por acción</InputLabel>
                <Select
                  value={filtros.accion}
                  onChange={(e) =>
                    setFiltros({ ...filtros, accion: e.target.value })
                  }
                  label="Filtrar por acción"
                >
                  <MenuItem value="todos">Todas las acciones</MenuItem>
                  <MenuItem value="insert">Creaciones</MenuItem>
                  <MenuItem value="update">Actualizaciones</MenuItem>
                  <MenuItem value="delete">Eliminaciones</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Filtrar por fecha"
                value={filtros.fecha}
                onChange={(e) =>
                  setFiltros({ ...filtros, fecha: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        <List>
          {paginatedActividades.map((item) => (
            <Paper
              key={item.logId}
              elevation={1}
              sx={{ mb: 2, borderRadius: 2 }}
            >
              <ListItem
                sx={{
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {item.usuario?.nombre?.charAt(0) || 'U'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        {item.usuario?.nombre || 'Usuario desconocido'}
                      </Typography>
                      <Chip
                        label={getAccionLabel(item.accion)}
                        color={getAccionColor(item.accion)}
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
                        {new Date(item.fecha).toLocaleString()}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.descripcion}
                      </Typography>
                    </>
                  }
                />
                <Tooltip title="Ver detalles">
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
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
  );
};

export default AuditSection;
