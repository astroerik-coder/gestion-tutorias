import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  FormControl,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";

const AppBar = ({ onMenuClick, role, onRoleChange, user }) => {
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
  <Box
    sx={{
      px: 2,
      py: 0.5,
      borderRadius: 1,
      bgcolor: "rgba(0, 0, 0, 0.04)",
      display: "flex",
      alignItems: "center",
      height: 36,
    }}
  >
    <Typography sx={{ fontWeight: 500, fontSize: "0.875rem", color: "text.primary" }}>
      Rol: {role.charAt(0).toUpperCase() + role.slice(1)}
    </Typography>
  </Box>
  <Avatar
    sx={{
      bgcolor: "primary.main",
      width: 32,
      height: 32,
      fontSize: "0.875rem",
    }}
  >
    {user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
  </Avatar>
</Box>


      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
