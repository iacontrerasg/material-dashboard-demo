import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Card,
  CardContent,
  MenuItem,
  Snackbar,
  Alert,
  Fab,
  InputAdornment
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Business,
  Build,
  VisibilityOutlined
} from '@mui/icons-material';
import { Project } from '../types';

interface ProjectModuleProps {
  onNavigateToMotor: (motorId: string) => void;
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

const ProjectModule: React.FC<ProjectModuleProps> = ({ 
  onNavigateToMotor, 
  selectedProjectId, 
  onClearSelectedProject 
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [motorModalOpen, setMotorModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceName: '',
    serviceDescription: '',
    amount: '',
    startDate: '',
    endDate: '',
    status: 'pendiente' as Project['status']
  });

  // Cargar proyectos de ejemplo al iniciar
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '20240001',
        clientName: 'Metro CDMX',
        clientEmail: 'linea1@metro.com',
        clientPhone: '+52 555 1234567',
        serviceName: 'Modernización Sistema Eléctrico Línea 1',
        serviceDescription: 'Modernización completa del sistema eléctrico de la línea 1',
        amount: 250000,
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        status: 'activo',
        createdAt: '2024-01-01',
        associatedMotors: [
          {
            id: '1',
            marca: 'Siemens',
            modelo: 'Velaro MS',
            numeroSerie: 'SIE789456123',
            tipo: 'electrico',
            potencia: '6400 kW',
            voltaje: '25000 V',
            anio: 2020,
            lineaMetro: 'Línea 1',
            numeroFormacion: 'F-101',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Carlos Mendoza',
            emailResponsable: 'carlos.mendoza@metro.com',
            telefonoResponsable: '+52 555 1111111',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-15',
            proximoMantenimiento: '2024-07-15',
            kilometrosRecorridos: 145000,
            horasOperacion: 2250,
            observaciones: 'Mantenimiento preventivo programado',
            creadoEn: '2024-01-01'
          },
          {
            id: '2',
            marca: 'Siemens',
            modelo: 'Velaro MS',
            numeroSerie: 'SIE789456124',
            tipo: 'electrico',
            potencia: '6400 kW',
            voltaje: '25000 V',
            anio: 2020,
            lineaMetro: 'Línea 1',
            numeroFormacion: 'F-102',
            tipoFormacion: 'intermedio',
            responsableTecnico: 'Carlos Mendoza',
            emailResponsable: 'carlos.mendoza@metro.com',
            telefonoResponsable: '+52 555 1111111',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-10',
            proximoMantenimiento: '2024-07-10',
            kilometrosRecorridos: 138000,
            horasOperacion: 2180,
            observaciones: 'Funcionamiento óptimo',
            creadoEn: '2024-01-01'
          }
        ]
      },
      {
        id: '20240002',
        clientName: 'Metro CDMX',
        clientEmail: 'linea2@metro.com',
        clientPhone: '+52 555 2345678',
        serviceName: 'Mantenimiento Preventivo Línea 2',
        serviceDescription: 'Mantenimiento preventivo integral de la línea 2',
        amount: 180000,
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        status: 'pendiente',
        createdAt: '2024-01-20',
        associatedMotors: [
          {
            id: '3',
            marca: 'Alstom',
            modelo: 'Metropolis',
            numeroSerie: 'ALS321654987',
            tipo: 'traccion_electrica',
            potencia: '1600 kW',
            voltaje: '750 V',
            anio: 2019,
            lineaMetro: 'Línea 2',
            numeroFormacion: 'F-205',
            tipoFormacion: 'intermedio',
            responsableTecnico: 'Ana Rodríguez',
            emailResponsable: 'ana.rodriguez@metro.com',
            telefonoResponsable: '+52 555 2222222',
            estado: 'requiere_mantenimiento',
            ultimoMantenimiento: '2023-12-01',
            proximoMantenimiento: '2024-02-01',
            kilometrosRecorridos: 278000,
            horasOperacion: 3900,
            observaciones: 'Revisar sistema de frenado regenerativo',
            creadoEn: '2023-11-15'
          },
          {
            id: '4',
            marca: 'Alstom',
            modelo: 'Metropolis',
            numeroSerie: 'ALS321654988',
            tipo: 'traccion_electrica',
            potencia: '1600 kW',
            voltaje: '750 V',
            anio: 2019,
            lineaMetro: 'Línea 2',
            numeroFormacion: 'F-206',
            tipoFormacion: 'cola',
            responsableTecnico: 'Ana Rodríguez',
            emailResponsable: 'ana.rodriguez@metro.com',
            telefonoResponsable: '+52 555 2222222',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-05',
            proximoMantenimiento: '2024-04-05',
            kilometrosRecorridos: 265000,
            horasOperacion: 3720,
            observaciones: 'Revisión mensual completada',
            creadoEn: '2023-11-15'
          }
        ]
      },
      {
        id: '20240003',
        clientName: 'Metro CDMX',
        clientEmail: 'linea3@metro.com',
        clientPhone: '+52 555 3456789',
        serviceName: 'Instalación Sistema Seguridad Línea 3',
        serviceDescription: 'Instalación de sistemas de seguridad avanzados',
        amount: 320000,
        startDate: '2024-01-10',
        endDate: '2024-05-10',
        status: 'activo',
        createdAt: '2024-01-01',
        associatedMotors: [
          {
            id: '5',
            marca: 'CAF',
            modelo: 'Urbos',
            numeroSerie: 'CAF555777999',
            tipo: 'diesel_electrico',
            potencia: '2400 kW',
            voltaje: '1500 V',
            anio: 2022,
            lineaMetro: 'Línea 3',
            numeroFormacion: 'F-312',
            tipoFormacion: 'cola',
            responsableTecnico: 'Luis García',
            emailResponsable: 'luis.garcia@metro.com',
            telefonoResponsable: '+52 555 3333333',
            estado: 'en_mantenimiento',
            ultimoMantenimiento: '2024-01-20',
            proximoMantenimiento: '2024-08-20',
            kilometrosRecorridos: 95000,
            horasOperacion: 1250,
            observaciones: 'Actualización de sistema de control',
            creadoEn: '2024-01-05'
          },
          {
            id: '6',
            marca: 'CAF',
            modelo: 'Urbos',
            numeroSerie: 'CAF555778000',
            tipo: 'diesel_electrico',
            potencia: '2400 kW',
            voltaje: '1500 V',
            anio: 2022,
            lineaMetro: 'Línea 3',
            numeroFormacion: 'F-313',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Luis García',
            emailResponsable: 'luis.garcia@metro.com',
            telefonoResponsable: '+52 555 3333333',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-18',
            proximoMantenimiento: '2024-08-18',
            kilometrosRecorridos: 92000,
            horasOperacion: 1180,
            observaciones: 'Sistema de seguridad instalado',
            creadoEn: '2024-01-05'
          }
        ]
      },
      {
        id: '20240004',
        clientName: 'Metro CDMX',
        clientEmail: 'linea4@metro.com',
        clientPhone: '+52 555 4567890',
        serviceName: 'Reparación Motores Tracción Línea 4',
        serviceDescription: 'Reparación especializada de motores de tracción',
        amount: 190000,
        startDate: '2024-01-25',
        endDate: '2024-04-25',
        status: 'activo',
        createdAt: '2024-01-20',
        associatedMotors: [
          {
            id: '7',
            marca: 'Bombardier',
            modelo: 'Regina',
            numeroSerie: 'BOM445678901',
            tipo: 'traccion_electrica',
            potencia: '1800 kW',
            voltaje: '1000 V',
            anio: 2021,
            lineaMetro: 'Línea 4',
            numeroFormacion: 'F-401',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'María Fernández',
            emailResponsable: 'maria.fernandez@metro.com',
            telefonoResponsable: '+52 555 4444444',
            estado: 'requiere_mantenimiento',
            ultimoMantenimiento: '2023-11-25',
            proximoMantenimiento: '2024-02-25',
            kilometrosRecorridos: 185000,
            horasOperacion: 2850,
            observaciones: 'Revisión mayor de motores de tracción',
            creadoEn: '2024-01-20'
          },
          {
            id: '8',
            marca: 'Bombardier',
            modelo: 'Regina',
            numeroSerie: 'BOM445678902',
            tipo: 'traccion_electrica',
            potencia: '1800 kW',
            voltaje: '1000 V',
            anio: 2021,
            lineaMetro: 'Línea 4',
            numeroFormacion: 'F-402',
            tipoFormacion: 'intermedio',
            responsableTecnico: 'María Fernández',
            emailResponsable: 'maria.fernandez@metro.com',
            telefonoResponsable: '+52 555 4444444',
            estado: 'en_mantenimiento',
            ultimoMantenimiento: '2024-01-25',
            proximoMantenimiento: '2024-04-25',
            kilometrosRecorridos: 192000,
            horasOperacion: 2920,
            observaciones: 'Reparación en progreso',
            creadoEn: '2024-01-20'
          }
        ]
      },
      {
        id: '20240005',
        clientName: 'Metro CDMX',
        clientEmail: 'linea5@metro.com',
        clientPhone: '+52 555 5678901',
        serviceName: 'Inspección Técnica Línea 5',
        serviceDescription: 'Inspección técnica detallada de sistemas',
        amount: 95000,
        startDate: '2024-01-18',
        endDate: '2024-03-18',
        status: 'activo',
        createdAt: '2024-01-15',
        associatedMotors: [
          {
            id: '9',
            marca: 'Hitachi',
            modelo: 'A-Train',
            numeroSerie: 'HIT667889012',
            tipo: 'electrico',
            potencia: '1400 kW',
            voltaje: '800 V',
            anio: 2023,
            lineaMetro: 'Línea 5',
            numeroFormacion: 'F-501',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Pedro Martínez',
            emailResponsable: 'pedro.martinez@metro.com',
            telefonoResponsable: '+52 555 5555555',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-18',
            proximoMantenimiento: '2024-07-18',
            kilometrosRecorridos: 45000,
            horasOperacion: 680,
            observaciones: 'Inspección técnica completada',
            creadoEn: '2024-01-15'
          },
          {
            id: '10',
            marca: 'Hitachi',
            modelo: 'A-Train',
            numeroSerie: 'HIT667889013',
            tipo: 'electrico',
            potencia: '1400 kW',
            voltaje: '800 V',
            anio: 2023,
            lineaMetro: 'Línea 5',
            numeroFormacion: 'F-502',
            tipoFormacion: 'cola',
            responsableTecnico: 'Pedro Martínez',
            emailResponsable: 'pedro.martinez@metro.com',
            telefonoResponsable: '+52 555 5555555',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-20',
            proximoMantenimiento: '2024-07-20',
            kilometrosRecorridos: 43000,
            horasOperacion: 650,
            observaciones: 'Sistemas funcionando correctamente',
            creadoEn: '2024-01-15'
          }
        ]
      },
      {
        id: '20240006',
        clientName: 'Metro CDMX',
        clientEmail: 'linea6@metro.com',
        clientPhone: '+52 555 6789012',
        serviceName: 'Implementación Sistema Híbrido Línea 6',
        serviceDescription: 'Implementación de tecnología híbrida avanzada',
        amount: 580000,
        startDate: '2024-01-30',
        endDate: '2024-08-30',
        status: 'activo',
        createdAt: '2024-01-25',
        associatedMotors: [
          {
            id: '11',
            marca: 'Stadler',
            modelo: 'METRO',
            numeroSerie: 'STD778990123',
            tipo: 'hibrido',
            potencia: '2000 kW',
            voltaje: '1200 V',
            anio: 2024,
            lineaMetro: 'Línea 6',
            numeroFormacion: 'F-601',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Carmen López',
            emailResponsable: 'carmen.lopez@metro.com',
            telefonoResponsable: '+52 555 6666666',
            estado: 'operativo',
            ultimoMantenimiento: '2024-01-30',
            proximoMantenimiento: '2024-07-30',
            kilometrosRecorridos: 15000,
            horasOperacion: 240,
            observaciones: 'Sistema híbrido funcionando óptimamente',
            creadoEn: '2024-01-25'
          },
          {
            id: '12',
            marca: 'Stadler',
            modelo: 'METRO',
            numeroSerie: 'STD778990124',
            tipo: 'hibrido',
            potencia: '2000 kW',
            voltaje: '1200 V',
            anio: 2024,
            lineaMetro: 'Línea 6',
            numeroFormacion: 'F-602',
            tipoFormacion: 'intermedio',
            responsableTecnico: 'Carmen López',
            emailResponsable: 'carmen.lopez@metro.com',
            telefonoResponsable: '+52 555 6666666',
            estado: 'operativo',
            ultimoMantenimiento: '2024-02-01',
            proximoMantenimiento: '2024-08-01',
            kilometrosRecorridos: 12000,
            horasOperacion: 195,
            observaciones: 'Pruebas iniciales completadas',
            creadoEn: '2024-01-25'
          }
        ]
      }
    ];
    setProjects(sampleProjects);
  }, []);

  // Filtrar automáticamente cuando se navega desde el dashboard
  useEffect(() => {
    if (selectedProjectId && projects.length > 0) {
      setSearchTerm(selectedProjectId);
      // Limpiar el selectedProjectId después de aplicar el filtro
      if (onClearSelectedProject) {
        onClearSelectedProject();
      }
    }
  }, [selectedProjectId, projects, onClearSelectedProject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const generateProjectId = () => {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
      return `${year}${randomNum}`;
    };

    const newProject: Project = {
      id: editingProject?.id || generateProjectId(),
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: editingProject?.createdAt || new Date().toISOString()
    };

    if (editingProject) {
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id ? newProject : project
      ));
      setSnackbar({ open: true, message: 'Proyecto actualizado exitosamente', severity: 'success' });
    } else {
      setProjects(prev => [...prev, newProject]);
      setSnackbar({ open: true, message: 'Proyecto creado exitosamente', severity: 'success' });
    }

    handleCloseDialog();
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        clientName: project.clientName,
        clientEmail: project.clientEmail,
        clientPhone: project.clientPhone,
        serviceName: project.serviceName,
        serviceDescription: project.serviceDescription,
        amount: project.amount.toString(),
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status
      });
    } else {
      setEditingProject(null);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceName: '',
        serviceDescription: '',
        amount: '',
        startDate: '',
        endDate: '',
        status: 'pendiente'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    setSnackbar({ open: true, message: 'Proyecto eliminado', severity: 'success' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo': return 'success';
      case 'pendiente': return 'warning';
      case 'completado': return 'info';
      case 'cancelado': return 'error';
      default: return 'default';
    }
  };

  const handleOpenMotorModal = (project: Project) => {
    setSelectedProject(project);
    setMotorModalOpen(true);
  };

  const handleCloseMotorModal = () => {
    setMotorModalOpen(false);
    setSelectedProject(null);
  };

  const getMotorStatusColor = (status: string) => {
    switch (status) {
      case 'operativo': return 'success';
      case 'en_mantenimiento': return 'warning';
      case 'requiere_mantenimiento': return 'error';
      case 'fuera_servicio': return 'error';
      default: return 'default';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      {/* Estadísticas */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {projects.length}
                  </Typography>
                  <Typography variant="body2">
                    Total Proyectos
                  </Typography>
                </Box>
                <Business sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {projects.filter(c => c.status === 'activo').length}
                  </Typography>
                  <Typography variant="body2">
                    Proyectos Activos
                  </Typography>
                </Box>
                <VisibilityOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Controles */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar por ID, cliente o servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          <TextField
            select
            label="Filtrar por estado"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="completado">Completado</MenuItem>
            <MenuItem value="cancelado">Cancelado</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* Tabla de proyectos */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 'bold', width: '120px', minWidth: '120px' }}>ID Proyecto</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>Motores</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Servicio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow 
                key={project.id} 
                hover 
                onClick={() => handleOpenMotorModal(project)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <TableCell sx={{ width: '120px', minWidth: '120px' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#1e3a8a',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem'
                    }}
                  >
                    {project.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Chip 
                      label={project.associatedMotors?.length || 0} 
                      color="primary"
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', minWidth: '18px', height: '18px' } }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {project.clientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.clientEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {project.serviceName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                    ${project.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status) as any}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDialog(project);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón flotante para agregar */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenDialog()}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)',
        }}
      >
        <Add />
      </Fab>

      {/* Dialog para crear/editar proyecto */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="clientName"
                  label="Nombre del Cliente"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="clientEmail"
                  label="Email del Cliente"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="clientPhone"
                  label="Teléfono del Cliente"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="serviceName"
                  label="Nombre del Servicio"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>
            <TextField
              name="serviceDescription"
              label="Descripción del Servicio"
              value={formData.serviceDescription}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="amount"
                  label="Monto"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="startDate"
                  label="Fecha de Inicio"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="endDate"
                  label="Fecha de Fin"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProject ? 'Actualizar' : 'Crear'} Proyecto
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para mostrar motores asociados */}
      <Dialog open={motorModalOpen} onClose={handleCloseMotorModal} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Build sx={{ color: '#1e3a8a' }} />
            <Typography variant="h6" component="div">
              Proyecto {selectedProject?.id} - {selectedProject?.clientName}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {selectedProject?.serviceName} | Total de motores: {selectedProject?.associatedMotors?.length || 0}
          </Typography>
          
          {selectedProject?.associatedMotors?.length ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {selectedProject.associatedMotors.map((motor) => (
                <Paper 
                  key={motor.id} 
                  sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f7fa',
                      borderColor: '#1e3a8a'
                    }
                  }}
                  onClick={() => onNavigateToMotor(motor.id)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Build sx={{ color: '#1e3a8a', fontSize: '1.2rem' }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                          {motor.marca} {motor.modelo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {motor.lineaMetro} • Formación {motor.numeroFormacion} • {motor.potencia}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Próximo mantenimiento: {motor.proximoMantenimiento}
                      </Typography>
                      <Chip
                        label={motor.estado.replace('_', ' ')}
                        color={getMotorStatusColor(motor.estado) as any}
                        variant="filled"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Build sx={{ fontSize: '4rem', color: '#ccc', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No hay motores asociados a este proyecto.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMotorModal} sx={{ color: '#1e3a8a' }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectModule; 