import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { login } from "../services/loginService";

export default function SignInPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(correo, contrasena);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography component="h1" variant="h4" align="center" mb={2}>
            Sistema de Tutorías
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Inicia sesión para acceder al sistema
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Correo"
              fullWidth
              margin="normal"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Iniciar sesión
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
