import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const CoordinatorDashboard = ({ statistics, recentActivity }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", backgroundColor: "background.paper" }}>
          <CardHeader
            title="Estadísticas Generales"
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              {statistics ? (
                <>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Sesiones Totales
                      </Typography>
                      <Typography variant="h4">
                        {statistics.totalSessions ?? 0}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "success.light",
                        color: "success.contrastText",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Sesiones Completadas
                      </Typography>
                      <Typography variant="h4">
                        {statistics.completedSessions ?? 0}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "warning.light",
                        color: "warning.contrastText",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Solicitudes Pendientes
                      </Typography>
                      <Typography variant="h4">
                        {statistics.pendingRequests ?? 0}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "info.light",
                        color: "info.contrastText",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Tutores Activos
                      </Typography>
                      <Typography variant="h4">
                        {statistics.activeTutors ?? 0}
                      </Typography>
                    </Box>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography color="text.secondary">
                    No hay estadísticas disponibles por el momento.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", backgroundColor: "background.paper" }}>
          <CardHeader
            title="Actividad Reciente"
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            {recentActivity?.length > 0 ? (
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <ListItemText
                        primary={activity.description}
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {activity.timestamp}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                No hay actividad reciente registrada.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CoordinatorDashboard;
