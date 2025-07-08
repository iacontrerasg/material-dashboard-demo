import React, { useState } from 'react';
import {
  Box,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Avatar,
  Paper,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  BusinessCenter
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const users = [
    { id: 'admin', name: 'Administrador', email: 'admin@empresa.com' },
    { id: 'supervisor', name: 'Supervisor Técnico', email: 'supervisor@empresa.com' },
    { id: 'operador', name: 'Operador Metro', email: 'operador@empresa.com' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const selectedUserData = users.find(user => user.id === selectedUser);
      if (!selectedUserData) {
        setError('Por favor selecciona un usuario');
        setLoading(false);
        return;
      }

      const success = await login(selectedUserData.email, password);
      if (!success) {
        setError('Credenciales inválidas. Usa la contraseña: admin123');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)',
              py: 4,
              px: 3,
              textAlign: 'center'
            }}
          >
            <Avatar
              sx={{
                mx: 'auto',
                mb: 2,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 70,
                height: 70
              }}
            >
              <BusinessCenter sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
              INDUSTRIAS FMD
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
              Sistema de Proyectos y Motores
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl 
                fullWidth 
                margin="normal" 
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#1e3a8a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1e3a8a',
                    },
                  },
                }}
              >
                <InputLabel id="user-select-label">Usuario</InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value={selectedUser}
                  label="Usuario"
                  onChange={(e) => setSelectedUser(e.target.value)}
                  autoFocus
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#1e3a8a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1e3a8a',
                    },
                  },
                }}
              />
              
              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1e40af 0%, #4b5563 100%)',
                  },
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  <strong>Usuarios disponibles:</strong>
                </Typography>
                {users.map((user) => (
                  <Typography key={user.id} variant="body2" color="text.secondary" align="center">
                    {user.name} ({user.email})
                  </Typography>
                ))}
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  <strong>Contraseña para todos:</strong> admin123
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 