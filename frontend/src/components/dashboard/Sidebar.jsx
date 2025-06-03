import React from "react";
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

const sidebarItems = {
  estudiante: [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "request", label: "Solicitar Tutoría", icon: DescriptionIcon },
    { id: "sessions", label: "Mis Sesiones", icon: CalendarIcon },
    { id: "feedback", label: "Calificaciones", icon: StarIcon },
  ],
  tutor: [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "schedule", label: "Mis Horarios", icon: ScheduleIcon },
    { id: "requests", label: "Solicitudes", icon: AssignmentIcon },
    { id: "sessions", label: "Sesiones", icon: CalendarIcon },
  ],
  coordinador: [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    {
      id: "manage-requests",
      label: "Gestionar Solicitudes",
      icon: SettingsIcon,
    },
    { id: "users", label: "Usuarios", icon: PeopleIcon },
    { id: "audit", label: "Auditoría", icon: AssessmentIcon },
  ],
};

const Sidebar = ({ open, onClose, role, activeSection, onSectionChange }) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", py: 2 }}>
        <List>
          {sidebarItems[role]?.map((item) => (
            <ListItem
              button
              key={item.id}
              selected={activeSection === item.id}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              sx={{
                mx: 1,
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
