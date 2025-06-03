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
          <FormControl
            size="small"
            sx={{
              minWidth: 120,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              },
            }}
          >
            <Select
              value={role}
              onChange={(e) => onRoleChange(e.target.value)}
              sx={{
                color: "text.primary",
                ".MuiSelect-icon": { color: "text.primary" },
              }}
              IconComponent={SwapHorizIcon}
            >
              <MenuItem value="estudiante">Estudiante</MenuItem>
              <MenuItem value="tutor">Tutor</MenuItem>
              <MenuItem value="coordinador">Coordinador</MenuItem>
            </Select>
          </FormControl>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 32,
              height: 32,
              fontSize: "0.875rem",
            }}
          >
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "U"}
          </Avatar>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
