"use client"

import { useUser } from "@clerk/clerk-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'

export default function OnboardingPage() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!role || !user) return

    setLoading(true)

    try {
      await user.update({
        publicMetadata: {
          role: role,
          additionalInfo: additionalInfo,
          onboardingComplete: true,
        },
      })

      const userData = {
        clerkId: user.id,
        nombre: user.fullName || user.firstName || "Usuario",
        correo: user.primaryEmailAddress?.emailAddress,
        rol: role,
        additionalInfo: additionalInfo,
      }

      console.log("Usuario creado:", userData)
      navigate("/dashboard")
    } catch (error) {
      console.error("Error during onboarding:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAdditionalInfoLabel = () => {
    switch (role) {
      case "estudiante":
        return "Carrera"
      case "tutor":
        return "Departamento"
      case "coordinador":
        return "Área de coordinación"
      default:
        return "Información adicional"
    }
  }

  const getAdditionalInfoPlaceholder = () => {
    switch (role) {
      case "estudiante":
        return "Ej: Ingeniería de Sistemas"
      case "tutor":
        return "Ej: Matemáticas"
      case "coordinador":
        return "Ej: Coordinación Académica"
      default:
        return "Información adicional"
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 2,
              p: 2,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SchoolIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>

          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Completa tu perfil
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Selecciona tu rol para personalizar tu experiencia
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="role-label">Rol en el sistema</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Rol en el sistema"
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="estudiante">Estudiante</MenuItem>
                <MenuItem value="tutor">Tutor</MenuItem>
                <MenuItem value="coordinador">Coordinador</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={getAdditionalInfoLabel()}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder={getAdditionalInfoPlaceholder()}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !role}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Completar registro"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
