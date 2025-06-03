// src/components/dashboard/sections/AuditPage.jsx
import React, { useEffect, useState } from 'react';
import AuditSection from '../components/dashboard/sections/AuditSection';
import { auditService } from '../services/api';
import { Typography, Box, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';

const AuditPage = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);

// Cargar usuarios estudiantes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/usuarios");
        const estudiantes = res.data.filter((u) => u.rol === "estudiante");
        setUsers(estudiantes);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };
    fetchUsers();
  }, []);


// Cargar logs iniciales
  useEffect(() => {
    const fetchInitialLogs = async () => {
      setLoading(true);
      try {
        const data = await auditService.getLogsByTable("solicitud");
        setLogs(data);
      } catch (error) {
        console.error("Error cargando logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialLogs();
  }, []);

  // Cambia a logs por usuario
  useEffect(() => {
    const fetchUserLogs = async () => {
      if (!selectedUserId) return;
      setLoading(true);
      try {
        const data = await auditService.getLogsByUser(selectedUserId);
        setLogs(data);
      } catch (error) {
        console.error("Error cargando logs por usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserLogs();
  }, [selectedUserId]);

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 2, width: 320 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Filtrar por estudiante:
        </Typography>
        <Select
          fullWidth
          displayEmpty
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <MenuItem value="">-- Ver todos los logs de solicitudes --</MenuItem>
          {users.map((user) => (
            <MenuItem key={user.usuarioId} value={user.usuarioId}>
              {user.nombre} ({user.correo})
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? <CircularProgress /> : <AuditSection activities={logs} />}
    </Box>
  );
};

export default AuditPage;
