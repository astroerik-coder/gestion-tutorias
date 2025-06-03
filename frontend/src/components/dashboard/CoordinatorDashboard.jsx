import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { solicitudService } from "../../services/api";
import StatisticsDashboard from "./StatisticsDashboard";

const ITEMS_PER_PAGE = 10;

const CoordinatorDashboard = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSolicitudes();
  }, [page]);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await solicitudService.getSolicitudes();
      setSolicitudes(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (err) {
      setError("Error al cargar las solicitudes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEstado = async (solicitudId, nuevoEstado) => {
    try {
      await solicitudService.cambiarEstadoSolicitud(solicitudId, nuevoEstado);
      fetchSolicitudes();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      setError("Error al cambiar el estado de la solicitud");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "aprobada":
        return "success";
      case "pendiente":
        return "warning";
      case "rechazada":
        return "error";
      default:
        return "default";
    }
  };

  const paginatedSolicitudes = solicitudes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Grid container spacing={3}>
      {/* Sección de Estadísticas */}
      <Grid item xs={12}>
        <StatisticsDashboard />
      </Grid>
    </Grid>
  );
};

export default CoordinatorDashboard;
