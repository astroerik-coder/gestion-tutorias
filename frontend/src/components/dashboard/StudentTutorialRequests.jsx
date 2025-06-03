import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import {
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const StudentTutorialRequests = ({ requests = [], loading, error }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredRequests = requests.filter((request) => {
    switch (tabValue) {
      case 0:
        return request.status === "Pendiente";
      case 1:
        return request.status === "Aprobada";
      case 2:
        return request.status === "Finalizada";
      default:
        return true;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "warning";
      case "Aprobada":
        return "success";
      case "Finalizada":
        return "info";
      case "Rechazada":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pendiente":
        return <AccessTimeIcon />;
      case "Aprobada":
        return <CheckCircleIcon />;
      case "Finalizada":
        return <CheckCircleIcon />;
      case "Rechazada":
        return <CancelIcon />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Mis Solicitudes de Tutoría
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ mb: 2 }}
          variant="fullWidth"
        >
          <Tab label="Pendientes" />
          <Tab label="Aprobadas" />
          <Tab label="Finalizadas" />
        </Tabs>

        {filteredRequests.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: "center" }} elevation={0}>
            <Typography color="text.secondary">
              No hay solicitudes{" "}
              {tabValue === 0
                ? "pendientes"
                : tabValue === 1
                ? "aprobadas"
                : "finalizadas"}
              .
            </Typography>
          </Paper>
        ) : (
          <List>
            {filteredRequests.map((request, index) => (
              <React.Fragment key={request.id}>
                <ListItem
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={request.subject || "Sin materia"}
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.primary">
                          {request.time || "Horario no definido"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {request.reason || "Sin motivo"}
                        </Typography>
                        {request.tutor && (
                          <Typography variant="body2" color="text.secondary">
                            Tutor: {request.tutor}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <Chip
                    icon={getStatusIcon(request.status)}
                    label={request.status}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </ListItem>
                {index < filteredRequests.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTutorialRequests;
