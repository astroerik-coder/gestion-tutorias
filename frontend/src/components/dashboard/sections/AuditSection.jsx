// src/components/dashboard/sections/AuditSection.jsx
import React from 'react';
import {
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
} from '@mui/material';

const AuditSection = ({ activities }) => {
  return (
    <Card sx={{ backgroundColor: 'background.paper' }}>
      <CardHeader title="Auditoría del Sistema" />
      <CardContent>
        <List>
          {activities.map((item) => (
            <ListItem
              key={item.logId}
              sx={{
                mb: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {item.usuario?.nombre?.charAt(0) || 'U'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.usuario?.nombre || 'Usuario desconocido'}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {new Date(item.fecha).toLocaleString()}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.descripcion}
                    </Typography>
                  </>
                }
              />
              <Chip
                label={item.accion}
                color={
                  item.accion === 'INSERT'
                    ? 'success'
                    : item.accion === 'UPDATE'
                    ? 'info'
                    : item.accion === 'DELETE'
                    ? 'error'
                    : 'default'
                }
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
    
  );
  
};

export default AuditSection;
