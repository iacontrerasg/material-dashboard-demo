import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  LinearProgress,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  TrendingUp,
  Train,
  CheckCircle,
  Schedule,
  Warning,
  BusinessCenter,
  Engineering,
  Search
} from '@mui/icons-material';

interface DashboardHomeProps {
  onNavigateToProject: (projectId: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigateToProject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      title: 'Proyectos Activos',
      value: '6',
      icon: <CheckCircle />,
      color: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      change: '+1 este mes'
    },
    {
      title: 'Motores Operativos',
      value: '8',
      icon: <Train />,
      color: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      change: '+2 esta semana'
    },
    {
      title: 'Motores en Reparación',
      value: '2',
      icon: <Engineering />,
      color: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      change: 'en progreso'
    },
    {
      title: 'Mantenimientos Programados',
      value: '2',
      icon: <Schedule />,
      color: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)',
      change: 'próximos 30 días'
    }
  ];

  const recentProjects = [
    {
      id: '20240001',
      client: 'Metro CDMX',
      service: 'Modernización Sistema Eléctrico Línea 1',
      amount: '$450,000',
      status: 'activo',
      date: '2024-01-15',
      motors: 2
    },
    {
      id: '20240002',
      client: 'Metro CDMX',
      service: 'Mantenimiento Preventivo Línea 2',
      amount: '$280,000',
      status: 'activo',
      date: '2024-01-20',
      motors: 2
    },
    {
      id: '20240003',
      client: 'Metro CDMX',
      service: 'Instalación Sistema Seguridad Línea 3',
      amount: '$320,000',
      status: 'activo',
      date: '2024-01-10',
      motors: 2
    },
    {
      id: '20240004',
      client: 'Metro CDMX',
      service: 'Reparación Motores Tracción Línea 4',
      amount: '$190,000',
      status: 'activo',
      date: '2024-01-25',
      motors: 2
    },
    {
      id: '20240005',
      client: 'Metro CDMX',
      service: 'Inspección Técnica Línea 5',
      amount: '$95,000',
      status: 'activo',
      date: '2024-01-18',
      motors: 2
    },
    {
      id: '20240006',
      client: 'Metro CDMX',
      service: 'Implementación Sistema Híbrido Línea 6',
      amount: '$580,000',
      status: 'activo',
      date: '2024-01-30',
      motors: 2
    }
  ];

  const filteredProjects = recentProjects.filter(project => 
    project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'activo':
        return <CheckCircle color="success" />;
      case 'pendiente':
        return <Schedule color="warning" />;
      case 'completado':
        return <CheckCircle color="info" />;
      default:
        return <Warning color="error" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'completado':
        return 'info';
      default:
        return 'error';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
          Dashboard - INDUSTRIAS FMD
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Resumen general del sistema de proyectos y motores del metro
        </Typography>
      </Box>

      {/* Estadísticas principales */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ flex: '1 1 250px', minWidth: 250 }}>
            <Card sx={{ 
              background: stat.color, 
              color: 'white',
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.3s ease'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Chip 
                      label={stat.change}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 50 } })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Contenido principal */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Proyectos recientes */}
        <Box sx={{ flex: '2 1 500px', minWidth: 500 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
              <BusinessCenter sx={{ mr: 1, color: '#1e3a8a' }} />
              Proyectos Activos
            </Typography>
            
            {/* Buscador de proyectos */}
            <Box sx={{ mb: 3 }}>
              <TextField
                placeholder="Buscar proyectos por ID, cliente o servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <List>
              {filteredProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <ListItem 
                    sx={{ 
                      px: 0,
                      cursor: 'pointer',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(30, 58, 138, 0.05)',
                      }
                    }}
                    onClick={() => onNavigateToProject(project.id)}
                  >
                    <ListItemIcon>
                      {getStatusIcon(project.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {project.client}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#1e3a8a', fontWeight: 'medium' }}>
                              ID: {project.id}
                            </Typography>
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                            {project.amount}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {project.service}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={project.status}
                              size="small"
                              color={getStatusColor(project.status) as any}
                              variant="outlined"
                            />
                            <Typography variant="body2" color="text.secondary">
                              {project.date}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredProjects.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            
            {filteredProjects.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No se encontraron proyectos que coincidan con la búsqueda
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Panel de progreso */}
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, color: '#1e3a8a' }} />
              Progreso del Mes
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Proyectos Activos</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>6/8</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1e3a8a'
                  }
                }} 
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Reparaciones Completadas</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>10/12</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={83} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#059669'
                  }
                }} 
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Motores Operativos</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>8/12</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={67} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#047857'
                  }
                }} 
              />
            </Box>
          </Paper>

          {/* Resumen rápido */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Resumen Rápido
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Proyectos Activos</Typography>
                <Chip label="6" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Reparaciones Urgentes</Typography>
                <Chip label="2" size="small" color="error" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Motores en Mantenimiento</Typography>
                <Chip label="2" size="small" color="info" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Próximos Mantenimientos</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                  2 programados
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome; 