import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { solicitudService } from '../../services/api';

const StatisticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('semana');

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await solicitudService.getSolicitudes();
      setSolicitudes(data);
    } catch (err) {
      setError('Error al cargar las estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtrarSolicitudesPorPeriodo = (solicitudes) => {
    const ahora = new Date();
    const inicioSemana = new Date(ahora);
    inicioSemana.setDate(ahora.getDate() - 7);

    return solicitudes.filter(solicitud => {
      const fechaSolicitud = new Date(solicitud.fecha);
      return fechaSolicitud >= inicioSemana && fechaSolicitud <= ahora;
    });
  };

  const procesarDatosGraficos = () => {
    const solicitudesFiltradas = filtrarSolicitudesPorPeriodo(solicitudes);

    // Datos para el gráfico de sesiones por tutor
    const sesionesPorTutor = solicitudesFiltradas.reduce((acc, solicitud) => {
      const tutor = solicitud.tutorNombre || 'Sin tutor';
      acc[tutor] = (acc[tutor] || 0) + 1;
      return acc;
    }, {});

    // Datos para el gráfico de sesiones por materia
    const sesionesPorMateria = solicitudesFiltradas.reduce((acc, solicitud) => {
      const materia = solicitud.materia || 'Sin materia';
      acc[materia] = (acc[materia] || 0) + 1;
      return acc;
    }, {});

    // Datos para el gráfico de feedbacks
    const feedbacksPorTutor = solicitudesFiltradas.reduce((acc, solicitud) => {
      if (solicitud.feedback) {
        const tutor = solicitud.tutorNombre || 'Sin tutor';
        acc[tutor] = (acc[tutor] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      sesionesPorTutor,
      sesionesPorMateria,
      feedbacksPorTutor,
    };
  };

  const { sesionesPorTutor, sesionesPorMateria, feedbacksPorTutor } = procesarDatosGraficos();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Estadísticas de Tutorías
      </Typography>

      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Período</InputLabel>
        <Select
          value={periodoSeleccionado}
          label="Período"
          onChange={(e) => setPeriodoSeleccionado(e.target.value)}
        >
          <MenuItem value="semana">Última semana</MenuItem>
          <MenuItem value="mes">Último mes</MenuItem>
          <MenuItem value="año">Último año</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sesiones por Tutor
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  series={[
                    {
                      data: Object.values(sesionesPorTutor),
                      label: 'Sesiones',
                    },
                  ]}
                  xAxis={[
                    {
                      data: Object.keys(sesionesPorTutor),
                      scaleType: 'band',
                    },
                  ]}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sesiones por Materia
              </Typography>
              <Box sx={{ height: 300 }}>
                <PieChart
                  series={[
                    {
                      data: Object.entries(sesionesPorMateria).map(([label, value]) => ({
                        id: label,
                        value,
                        label,
                      })),
                    },
                  ]}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feedbacks Recibidos por Tutor
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  series={[
                    {
                      data: Object.values(feedbacksPorTutor),
                      label: 'Feedbacks',
                    },
                  ]}
                  xAxis={[
                    {
                      data: Object.keys(feedbacksPorTutor),
                      scaleType: 'band',
                    },
                  ]}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsDashboard; 