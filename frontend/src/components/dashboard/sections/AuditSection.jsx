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
              key={item.id}
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
                  {item.subject ? item.subject.charAt(0) : 'A'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.subject || 'Nueva solicitud'}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {new Date(item.date).toLocaleDateString()}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      {item.status || 'Pendiente de revisión'}
                    </Typography>
                  </>
                }
              />
              <Chip
                label={item.status || 'Pendiente'}
                color={
                  item.status === 'aprobada'
                    ? 'success'
                    : item.status === 'rechazada'
                    ? 'error'
                    : 'warning'
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