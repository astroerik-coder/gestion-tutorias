import React, { useState } from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Popover,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../services/authService";

const AppBar = ({ onMenuClick, role, onRoleChange, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

const handleAvatarClick = async (event) => {
  try {
    setAnchorEl(event.currentTarget); // <-- NECESARIO para abrir el Popover

    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const correo = payload.sub;

    const res = await fetch(`http://localhost:8080/api/usuarios/correo/${correo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener usuario");
    }

    const userInfo = await res.json();
    setUserDetails(userInfo); // <-- ACTUALIZAR el estado del usuario
  } catch (err) {
    console.error("Error al cargar usuario:", err);
    setUserDetails(null);
  }
};


  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, color: "text.primary" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Sistema de Tutorías
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontWeight: 500, fontSize: "0.875rem", color: "text.primary" }}>
            Rol: {role.charAt(0).toUpperCase() + role.slice(1)}
          </Typography>

          <Tooltip title="Ver perfil">
            <Avatar
              sx={{ bgcolor: "primary.main", width: 32, height: 32, fontSize: "0.875rem", cursor: "pointer" }}
              onClick={handleAvatarClick}
            >
              {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
            </Avatar>
          </Tooltip>

          <Tooltip title="Cerrar sesión">
            <IconButton onClick={logout} sx={{ color: "error.main" }}>
              <ExitToAppIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* POPUP DETALLE USUARIO */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Box sx={{ p: 2, minWidth: 220 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {userDetails?.nombre || "Cargando..."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userDetails?.correo}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">
              <strong>Rol:</strong> {userDetails?.rol}
            </Typography>
            {userDetails?.carrera && (
              <Typography variant="body2">
                <strong>Carrera:</strong> {userDetails.carrera}
              </Typography>
            )}
          </Box>
        </Popover>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
