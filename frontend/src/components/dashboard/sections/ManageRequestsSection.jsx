import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const ManageRequestsSection = ({ 
  requests, 
  onAddRequest, 
  onApproveRequest, 
  onRejectRequest 
}) => {
  return (
    <Card sx={{ backgroundColor: 'background.paper' }}>
      <CardHeader 
        title="Gestionar Solicitudes"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddRequest}
          >
            Nueva Solicitud
          </Button>
        }
      />
      <CardContent>
        <List>
          {requests.map((request) => (
            <ListItem
              key={request.id}
              sx={{
                mb: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  {request.subject.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={request.subject}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {request.time}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      {request.reason}
                    </Typography>
                  </>
                }
              />
              <Box>
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => onApproveRequest(request.id)}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onRejectRequest(request.id)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ManageRequestsSection; 