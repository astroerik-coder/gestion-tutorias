import React from "react";
import {
  Grid,
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
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import PublishScheduleForm from "./PublishScheduleForm";

const TutorDashboard = ({ sessions = [], requests = [], onRequestStatus }) => {
  const pendingRequests = requests.filter(
    (request) => request.status === "pendiente"
  );

  return (
    <Grid container spacing={3}>
      {/* Sesiones programadas */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", backgroundColor: "background.paper" }}>
          <CardHeader
            title="Sesiones Programadas"
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            {sessions.length > 0 ? (
              <List>
                {sessions.map((session) => (
                  <ListItem
                    key={session.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {session.subject?.charAt(0) || "?"}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={session.subject || "Sin materia"}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {session.day} {session.time}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            Estudiante: {session.student || "Desconocido"}
                          </Typography>
                        </>
                      }
                    />
                    <Chip
                      label={session.status || "Sin estado"}
                      color={
                        session.status === "confirmada" ? "success" : "default"
                      }
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">
                  No tienes sesiones programadas aún.
                </Typography>
              </Paper>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Solicitudes pendientes */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", backgroundColor: "background.paper" }}>
          <CardHeader
            title="Solicitudes Pendientes"
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            {pendingRequests.length > 0 ? (
              <List>
                {pendingRequests.map((request) => (
                  <ListItem
                    key={request.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        {request.subject?.charAt(0) || "?"}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={request.subject || "Sin materia"}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {request.time || "Hora no especificada"}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            Estudiante: {request.student || "Desconocido"}
                          </Typography>
                        </>
                      }
                    />
                    <Grid container spacing={1} justifyContent="flex-end">
                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() =>
                            onRequestStatus(request.id, "aprobada")
                          }
                        >
                          Aprobar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            onRequestStatus(request.id, "rechazada")
                          }
                        >
                          Rechazar
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">
                  No tienes solicitudes pendientes en este momento.
                </Typography>
              </Paper>
            )}
          </CardContent>
        </Card>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <PublishScheduleForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TutorDashboard;
