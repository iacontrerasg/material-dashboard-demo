import React from 'react';
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
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  Train,
  CheckCircle,
  Schedule,
  Warning,
  BusinessCenter,
  Engineering
} from '@mui/icons-material';

const DashboardHome: React.FC = () => {
  const stats = [
    {
      title: 'Contratos Activos',
      value: '18',
      icon: <CheckCircle />,
      color: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      change: '+8%'
    },
    {
      title: 'Motores Operativos',
      value: '12',
      icon: <Train />,
      color: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      change: '+2 esta semana'
    },
    {
      title: 'Motores en Reparación',
      value: '3',
      icon: <Engineering />,
      color: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      change: '-1 desde ayer'
    },
    {
      title: 'Mantenimientos Programados',
      value: '7',
      icon: <Schedule />,
      color: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)',
      change: 'próximos 30 días'
    }
  ];

  const recentContracts = [
    {
      id: 1,
      client: 'Metro Línea 1',
      service: 'Mantenimiento Preventivo',
      amount: 'Trimestral',
      status: 'activo',
      date: '2024-01-15'
    },
    {
      id: 2,
      client: 'Metro Línea 2',
      service: 'Reparación de Motores',
      amount: 'Mensual',
      status: 'activo',
      date: '2024-01-20'
    },
    {
      id: 3,
      client: 'Metro Línea 3',
      service: 'Inspección Técnica',
      amount: 'Semanal',
      status: 'activo',
      date: '2024-01-10'
    }
  ];

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
          Resumen general del sistema de contratos y motores del metro
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
        {/* Contratos recientes */}
        <Box sx={{ flex: '2 1 500px', minWidth: 500 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
              <BusinessCenter sx={{ mr: 1, color: '#1e3a8a' }} />
              Contratos Activos
            </Typography>
            <List>
              {recentContracts.map((contract, index) => (
                <React.Fragment key={contract.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      {getStatusIcon(contract.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {contract.client}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                            {contract.amount}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {contract.service}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={contract.status}
                              size="small"
                              color={getStatusColor(contract.status) as any}
                              variant="outlined"
                            />
                            <Typography variant="body2" color="text.secondary">
                              {contract.date}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentContracts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
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
                <Typography variant="body2">Contratos Activos</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>18/24</Typography>
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
                    backgroundColor: '#059669'
                  }
                }} 
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Motores Operativos</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>12/15</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={80} 
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
                <Typography variant="body2">Contratos Activos</Typography>
                <Chip label="18" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Reparaciones Urgentes</Typography>
                <Chip label="2" size="small" color="error" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Motores en Mantenimiento</Typography>
                <Chip label="3" size="small" color="info" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Próximos Mantenimientos</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                  7 programados
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