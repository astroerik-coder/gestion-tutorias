import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Chip,
} from "@mui/material";
import { Avatar } from "@mui/material";

const StatisticsSection = ({ tutors, subjects }) => {
  return (
    <Card sx={{ backgroundColor: "background.paper" }}>
      <CardHeader title="Estadísticas Detalladas" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rendimiento de Tutores
              </Typography>
              {tutors?.length > 0 ? (
                <List>
                  {tutors.map((tutor) => (
                    <ListItem key={tutor.id}>
                      <ListItemAvatar>
                        <Avatar>{tutor.name.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={tutor.name}
                        secondary={tutor.subjects.join(", ")}
                      />
                      <Rating value={4.5} readOnly precision={0.5} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No hay datos de tutores disponibles.
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Materias más Solicitadas
              </Typography>
              {subjects?.length > 0 ? (
                <List>
                  {subjects.map((subject, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={subject.name}
                        secondary={`${subject.requests} solicitudes`}
                      />
                      <Chip
                        label={`${subject.percentage}%`}
                        color="primary"
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No hay datos de materias solicitadas.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsSection;
