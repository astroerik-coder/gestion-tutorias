import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const UsersSection = ({ 
  userTab, 
  onTabChange, 
  students, 
  tutors, 
  onAddUser, 
  onEditUser, 
  onDeleteUser 
}) => {
  return (
    <Card sx={{ backgroundColor: 'background.paper' }}>
      <CardHeader 
        title="Gestión de Usuarios"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddUser}
          >
            Agregar Usuario
          </Button>
        }
      />
      <CardContent>
        <Tabs value={userTab} onChange={(e, newValue) => onTabChange(newValue)}>
          <Tab label="Estudiantes" />
          <Tab label="Tutores" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {userTab === 0 ? (
            <List>
              {students.map((student) => (
                <ListItem
                  key={student.id}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{student.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={student.name}
                    secondary={student.email}
                  />
                  <IconButton onClick={() => onEditUser(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => onDeleteUser(student.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <List>
              {tutors.map((tutor) => (
                <ListItem
                  key={tutor.id}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{tutor.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={tutor.name}
                    secondary={tutor.email}
                  />
                  <IconButton onClick={() => onEditUser(tutor)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => onDeleteUser(tutor.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UsersSection; 