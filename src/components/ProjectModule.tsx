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
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Business,
  Build,
  VisibilityOutlined,
  ElectricBolt,
  Engineering,
  Train,
} from '@mui/icons-material';
import { Project } from '../types';

interface ProjectModuleProps {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
  onNavigateToMotors?: (projectId: string, motorId?: string) => void;
}

const ProjectModule: React.FC<ProjectModuleProps> = ({
  selectedProjectId,
  onClearSelectedProject,
  onNavigateToMotors,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [motorModalOpen, setMotorModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceName: '',
    serviceDescription: '',
    tipo: 'motores' as Project['tipo'],
    amount: '',
    startDate: '',
    endDate: '',
    status: 'pendiente' as Project['status'],
  });

  // Cargar proyectos de ejemplo al iniciar
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: 'STC-GACS-CNCS-119/2024',
        clientName: 'Sistema de Transporte Colectivo (STC)',
        clientEmail: 'mantenimiento@stc.gob.mx',
        clientPhone: '+52 55 5627 4900',
        serviceName: 'Mantenimiento a Motores Eléctricos',
        serviceDescription: 'Mantenimiento a Motores Eléctricos',
        tipo: 'motores',
        amount: 3500000,
        startDate: '2024-03-01',
        endDate: '2024-12-31',
        status: 'activo',
        createdAt: '2024-02-15',
        associatedMotors: [
          {
            id: '7',
            marca: 'INDUCTANCIA',
            modelo: 'MSL',
            numeroSerie: 'C312569',
            tipo: 'electrico',
            potencia: '2500 kW',
            voltaje: '1500 V',
            anio: 2018,
            lineaMetro: 'Línea 1',
            numeroFormacion: 'MSL-001',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Ing. Roberto Sánchez',
            emailResponsable: 'roberto.sanchez@stc.gob.mx',
            telefonoResponsable: '+52 555 3003003',
            estado: 'en_mantenimiento',
            ultimoMantenimiento: '2024-03-01',
            proximoMantenimiento: '2024-09-01',
            kilometrosRecorridos: 485000,
            horasOperacion: 6250,
            observaciones: 'Inductancia MSL en proceso de mantenimiento mayor',
            creadoEn: '2024-03-01',
            projectId: 'STC-GACS-CNCS-119/2024',
            projectName: 'Mantenimiento a Motores Eléctricos',
          },
          {
            id: '8',
            marca: 'MOTOR DE TRACCION',
            modelo: 'MB-3230',
            numeroSerie: 'T0037',
            tipo: 'traccion_electrica',
            potencia: '3200 kW',
            voltaje: '1500 V',
            anio: 2019,
            lineaMetro: 'Línea 2',
            numeroFormacion: 'MB-001',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Ing. Roberto Sánchez',
            emailResponsable: 'roberto.sanchez@stc.gob.mx',
            telefonoResponsable: '+52 555 3003003',
            estado: 'operativo',
            ultimoMantenimiento: '2024-02-15',
            proximoMantenimiento: '2024-08-15',
            kilometrosRecorridos: 420000,
            horasOperacion: 5800,
            observaciones: 'Motor de tracción MB-3230 funcionando óptimamente',
            creadoEn: '2024-03-01',
            projectId: 'STC-GACS-CNCS-119/2024',
            projectName: 'Mantenimiento a Motores Eléctricos',
          },
          {
            id: '9',
            marca: 'MOTOR DE TRACCION',
            modelo: 'MP-82',
            numeroSerie: '67826',
            tipo: 'traccion_electrica',
            potencia: '2800 kW',
            voltaje: '1500 V',
            anio: 2020,
            lineaMetro: 'Línea 3',
            numeroFormacion: 'MP-001',
            tipoFormacion: 'cabeza',
            responsableTecnico: 'Ing. Roberto Sánchez',
            emailResponsable: 'roberto.sanchez@stc.gob.mx',
            telefonoResponsable: '+52 555 3003003',
            estado: 'requiere_mantenimiento',
            ultimoMantenimiento: '2023-12-10',
            proximoMantenimiento: '2024-03-10',
            kilometrosRecorridos: 380000,
            horasOperacion: 5200,
            observaciones: 'Motor de tracción MP-82 requiere revisión de rodamientos',
            creadoEn: '2024-03-01',
            projectId: 'STC-GACS-CNCS-119/2024',
            projectName: 'Mantenimiento a Motores Eléctricos',
          },
        ],
      },
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
      const randomNum = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, '0');
      return `${year}${randomNum}`;
    };

    const newProject: Project = {
      id: editingProject?.id || generateProjectId(),
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: editingProject?.createdAt || new Date().toISOString(),
    };

    if (editingProject) {
      setProjects(prev =>
        prev.map(project => (project.id === editingProject.id ? newProject : project)),
      );
      setSnackbar({
        open: true,
        message: 'Proyecto actualizado exitosamente',
        severity: 'success',
      });
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
        tipo: project.tipo,
        amount: project.amount.toString(),
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
      });
    } else {
      setEditingProject(null);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceName: '',
        serviceDescription: '',
        tipo: 'motores',
        amount: '',
        startDate: '',
        endDate: '',
        status: 'pendiente',
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
      case 'activo':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'completado':
        return 'info';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
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

  const handleNavigateToMotor = (motorId: string) => {
    if (onNavigateToMotors && selectedProject) {
      onNavigateToMotors(selectedProject.id, motorId);
    }
    setMotorModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigateToProjectMotors = () => {
    if (onNavigateToMotors && selectedProject) {
      onNavigateToMotors(selectedProject.id);
    }
    setMotorModalOpen(false);
    setSelectedProject(null);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'operativo':
        return 'success';
      case 'en_mantenimiento':
        return 'info';
      case 'requiere_mantenimiento':
        return 'warning';
      case 'fuera_servicio':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'electrico':
        return <ElectricBolt sx={{ color: '#00e676' }} />;
      case 'diesel_electrico':
        return <Build sx={{ color: '#ff6d00' }} />;
      case 'traccion_electrica':
        return <Train sx={{ color: '#2196f3' }} />;
      default:
        return <Engineering sx={{ color: '#f44336' }} />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Ahora la navegación se maneja desde el layout con pestañas
  // No necesitamos renderizar MotorModule aquí

  return (
    <Box>
      {/* Estadísticas */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card
            sx={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)', color: 'white' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {projects.length}
                  </Typography>
                  <Typography variant="body2">Total Proyectos</Typography>
                </Box>
                <Business sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card
            sx={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {projects.filter(c => c.status === 'activo').length}
                  </Typography>
                  <Typography variant="body2">Proyectos Activos</Typography>
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
            onChange={e => setSearchTerm(e.target.value)}
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
            onChange={e => setFilterStatus(e.target.value)}
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
              <TableCell sx={{ fontWeight: 'bold', width: '250px', minWidth: '250px' }}>
                No. Proyecto
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '350px', maxWidth: '350px' }}>
                Descripción
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '100px' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>Elementos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '120px' }}>Monto</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '100px' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map(project => (
              <TableRow
                key={project.id}
                hover
                onClick={() => handleOpenMotorModal(project)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <TableCell sx={{ width: '250px', minWidth: '250px' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                    }}
                  >
                    {project.id}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '350px', maxWidth: '350px' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'medium',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={project.serviceDescription}
                  >
                    {project.serviceDescription}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '100px' }}>
                  <Chip
                    label={project.tipo.charAt(0).toUpperCase() + project.tipo.slice(1)}
                    color="default"
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Chip
                      label={project.associatedMotors?.length || 0}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.7rem',
                          minWidth: '18px',
                          height: '18px',
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ width: '120px' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                    ${project.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '100px' }}>
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
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenDialog(project);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={e => {
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
        <DialogTitle>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
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
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="tipo"
                  label="Tipo de Proyecto"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  select
                >
                  <MenuItem value="motores">Motores</MenuItem>
                  <MenuItem value="tarjetas">Tarjetas</MenuItem>
                  <MenuItem value="balizas">Balizas</MenuItem>
                </TextField>
              </Box>
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
      <Dialog open={motorModalOpen} onClose={handleCloseMotorModal} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ p: 0 }}>
          {/* Banner destacado del proyecto actual */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              color: 'white',
              p: 3,
              borderRadius: '4px 4px 0 0',
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Build sx={{ fontSize: '2rem' }} />
                </Box>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    🚀 PROYECTO ACTIVO
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ opacity: 0.9 }}>
                    {selectedProject?.id} - {selectedProject?.clientName}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  label={selectedProject?.status?.toUpperCase() || 'PENDIENTE'}
                  sx={{
                    backgroundColor:
                      selectedProject?.status === 'activo'
                        ? '#22c55e'
                        : selectedProject?.status === 'completado'
                        ? '#3b82f6'
                        : selectedProject?.status === 'pendiente'
                        ? '#f59e0b'
                        : '#ef4444',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {selectedProject?.associatedMotors?.length || 0} motores asociados
                </Typography>
              </Box>
            </Box>

            {/* Información adicional del proyecto */}
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                p: 2,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                📋 {selectedProject?.serviceDescription}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  🏷️ Tipo:{' '}
                  {selectedProject?.tipo
                    ? selectedProject.tipo.charAt(0).toUpperCase() + selectedProject.tipo.slice(1)
                    : 'No definido'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  💰 Monto: ${selectedProject?.amount?.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  📅 Inicio:{' '}
                  {selectedProject?.startDate
                    ? new Date(selectedProject.startDate).toLocaleDateString()
                    : 'No definido'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  📧 {selectedProject?.clientEmail}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              p: 2,
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
              border: '1px solid #e9ecef',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#1e3a8a',
                color: 'white',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Train />
            </Box>
            <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>
              Motores del Proyecto {selectedProject?.id}
            </Typography>
          </Box>

          {selectedProject?.associatedMotors?.length ? (
            <>
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<Build />}
                  onClick={handleNavigateToProjectMotors}
                  sx={{
                    backgroundColor: '#1e3a8a',
                    '&:hover': { backgroundColor: '#1e40af' },
                  }}
                >
                  Ver todos los motores del proyecto
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                O selecciona un motor específico de la tabla:
              </Typography>

              {/* Tabla de motores */}
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Motor</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Línea/Formación</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Kilometraje</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Próximo Mantenimiento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProject?.associatedMotors?.map(motor => (
                      <TableRow
                        key={motor.id}
                        hover
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 58, 138, 0.05)',
                          },
                        }}
                        onClick={() => handleNavigateToMotor(motor.id)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getTipoIcon(motor.tipo)}
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                {motor.marca} {motor.modelo}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {motor.numeroSerie}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {motor.lineaMetro}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Formación: {motor.numeroFormacion} ({motor.tipoFormacion})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {motor.tipo.replace('_', ' ')}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {motor.potencia} - {motor.voltaje}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                            {motor.kilometrosRecorridos.toLocaleString()} km
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {motor.horasOperacion} hrs
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={motor.estado.replace('_', ' ')}
                            color={getEstadoColor(motor.estado) as any}
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(motor.proximoMantenimiento).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
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
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectModule;
