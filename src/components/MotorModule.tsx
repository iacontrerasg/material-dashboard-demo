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
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Add,
  Edit,
  Search,
  Train,
  Build,
  ElectricBolt,
  Engineering,
  Download,
  Close,
  Description,
  GetApp,
  Assignment
} from '@mui/icons-material';
import { Motor } from '../types';

const MotorModule: React.FC = () => {
  const [motores, setMotores] = useState<Motor[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMotor, setEditingMotor] = useState<Motor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Estados para el modal de detalles
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedMotor, setSelectedMotor] = useState<Motor | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Form states
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    numeroSerie: '',
    tipo: 'electrico' as Motor['tipo'],
    potencia: '',
    voltaje: '',
    anio: new Date().getFullYear(),
    lineaMetro: '',
    numeroFormacion: '',
    tipoFormacion: 'intermedio' as Motor['tipoFormacion'],
    responsableTecnico: '',
    emailResponsable: '',
    telefonoResponsable: '',
    estado: 'operativo' as Motor['estado'],
    ultimoMantenimiento: '',
    proximoMantenimiento: '',
    kilometrosRecorridos: 0,
    horasOperacion: 0,
    observaciones: ''
  });

  // Cargar motores de ejemplo al iniciar
  useEffect(() => {
    const sampleMotores: Motor[] = [
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
        id: '3',
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
      }
    ];
    setMotores(sampleMotores);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'anio' || name === 'kilometrosRecorridos' || name === 'horasOperacion' 
        ? parseInt(value) || 0 
        : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nuevoMotor: Motor = {
      id: editingMotor?.id || Date.now().toString(),
      ...formData,
      creadoEn: editingMotor?.creadoEn || new Date().toISOString()
    };

    if (editingMotor) {
      setMotores(prev => prev.map(motor => 
        motor.id === editingMotor.id ? nuevoMotor : motor
      ));
      setSnackbar({ open: true, message: 'Motor actualizado exitosamente', severity: 'success' });
    } else {
      setMotores(prev => [...prev, nuevoMotor]);
      setSnackbar({ open: true, message: 'Motor registrado exitosamente', severity: 'success' });
    }

    handleCloseDialog();
  };

  const handleOpenDialog = (motor?: Motor) => {
    if (motor) {
      setEditingMotor(motor);
      setFormData({
        marca: motor.marca,
        modelo: motor.modelo,
        numeroSerie: motor.numeroSerie,
        tipo: motor.tipo,
        potencia: motor.potencia,
        voltaje: motor.voltaje,
        anio: motor.anio,
        lineaMetro: motor.lineaMetro,
        numeroFormacion: motor.numeroFormacion,
        tipoFormacion: motor.tipoFormacion,
        responsableTecnico: motor.responsableTecnico,
        emailResponsable: motor.emailResponsable,
        telefonoResponsable: motor.telefonoResponsable,
        estado: motor.estado,
        ultimoMantenimiento: motor.ultimoMantenimiento,
        proximoMantenimiento: motor.proximoMantenimiento,
        kilometrosRecorridos: motor.kilometrosRecorridos,
        horasOperacion: motor.horasOperacion,
        observaciones: motor.observaciones
      });
    } else {
      setEditingMotor(null);
      setFormData({
        marca: '',
        modelo: '',
        numeroSerie: '',
        tipo: 'electrico',
        potencia: '',
        voltaje: '',
        anio: new Date().getFullYear(),
        lineaMetro: '',
        numeroFormacion: '',
        tipoFormacion: 'intermedio',
        responsableTecnico: '',
        emailResponsable: '',
        telefonoResponsable: '',
        estado: 'operativo',
        ultimoMantenimiento: '',
        proximoMantenimiento: '',
        kilometrosRecorridos: 0,
        horasOperacion: 0,
        observaciones: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMotor(null);
  };

  const handleDownloadPlan = (motor: Motor) => {
    // Crear un link temporal para descargar el PDF
    const link = document.createElement('a');
    link.href = '/pdt.pdf';
    link.download = `Plan_Trabajo_${motor.marca}_${motor.modelo}_${motor.numeroFormacion}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSnackbar({ 
      open: true, 
      message: `Plan de trabajo descargado para ${motor.marca} ${motor.modelo}`, 
      severity: 'success' 
    });
  };

  // Funciones para el modal de detalles
  const handleOpenDetailsModal = (motor: Motor) => {
    setSelectedMotor(motor);
    setOpenDetailsModal(true);
    setTabValue(0);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedMotor(null);
    setTabValue(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditFromDetails = () => {
    if (selectedMotor) {
      setEditingMotor(selectedMotor);
      setFormData({
        marca: selectedMotor.marca,
        modelo: selectedMotor.modelo,
        numeroSerie: selectedMotor.numeroSerie,
        tipo: selectedMotor.tipo,
        potencia: selectedMotor.potencia,
        voltaje: selectedMotor.voltaje,
        anio: selectedMotor.anio,
        lineaMetro: selectedMotor.lineaMetro,
        numeroFormacion: selectedMotor.numeroFormacion,
        tipoFormacion: selectedMotor.tipoFormacion,
        responsableTecnico: selectedMotor.responsableTecnico,
        emailResponsable: selectedMotor.emailResponsable,
        telefonoResponsable: selectedMotor.telefonoResponsable,
        estado: selectedMotor.estado,
        ultimoMantenimiento: selectedMotor.ultimoMantenimiento,
        proximoMantenimiento: selectedMotor.proximoMantenimiento,
        kilometrosRecorridos: selectedMotor.kilometrosRecorridos,
        horasOperacion: selectedMotor.horasOperacion,
        observaciones: selectedMotor.observaciones
      });
      setOpenDialog(true);
      setOpenDetailsModal(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'operativo': return 'success';
      case 'en_mantenimiento': return 'info';
      case 'requiere_mantenimiento': return 'warning';
      case 'fuera_servicio': return 'error';
      default: return 'default';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'electrico': return <ElectricBolt sx={{ color: '#00e676' }} />;
      case 'diesel_electrico': return <Build sx={{ color: '#ff6d00' }} />;
      case 'traccion_electrica': return <Train sx={{ color: '#2196f3' }} />;
      default: return <Engineering sx={{ color: '#f44336' }} />;
    }
  };

  const filteredMotores = motores.filter(motor => {
    const matchesSearch = motor.responsableTecnico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.lineaMetro.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.numeroFormacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || motor.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <Box>
      {/* Estadísticas */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #374151 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {motores.length}
                  </Typography>
                  <Typography variant="body2">
                    Total Motores
                  </Typography>
                </Box>
                <Train sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {motores.filter(m => m.estado === 'en_mantenimiento').length}
                  </Typography>
                  <Typography variant="body2">
                    En Mantenimiento
                  </Typography>
                </Box>
                <Build sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {motores.filter(m => m.estado === 'requiere_mantenimiento').length}
                  </Typography>
                  <Typography variant="body2">
                    Requieren Mantenimiento
                  </Typography>
                </Box>
                <Engineering sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Controles */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar motores..."
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
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="operativo">Operativo</MenuItem>
            <MenuItem value="en_mantenimiento">En Mantenimiento</MenuItem>
            <MenuItem value="requiere_mantenimiento">Requiere Mantenimiento</MenuItem>
            <MenuItem value="fuera_servicio">Fuera de Servicio</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* Tabla de motores */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
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
            {filteredMotores.map((motor) => (
              <TableRow 
                key={motor.id} 
                hover 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(30, 58, 138, 0.05)',
                  }
                }}
                onClick={() => handleOpenDetailsModal(motor)}
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

      {/* Dialog para crear/editar motor */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingMotor ? 'Editar Motor' : 'Registrar Nuevo Motor'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="marca"
                  label="Marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="modelo"
                  label="Modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="anio"
                  label="Año"
                  type="number"
                  value={formData.anio}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="numeroSerie"
                  label="Número de Serie"
                  value={formData.numeroSerie}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="tipo"
                  label="Tipo de Motor"
                  select
                  value={formData.tipo}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="electrico">Eléctrico</MenuItem>
                  <MenuItem value="diesel_electrico">Diesel Eléctrico</MenuItem>
                  <MenuItem value="traccion_electrica">Tracción Eléctrica</MenuItem>
                  <MenuItem value="hibrido">Híbrido</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="potencia"
                  label="Potencia"
                  value={formData.potencia}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="ej: 1600 kW"
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="voltaje"
                  label="Voltaje"
                  value={formData.voltaje}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="ej: 750 V"
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="estado"
                  label="Estado"
                  select
                  value={formData.estado}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="operativo">Operativo</MenuItem>
                  <MenuItem value="en_mantenimiento">En Mantenimiento</MenuItem>
                  <MenuItem value="requiere_mantenimiento">Requiere Mantenimiento</MenuItem>
                  <MenuItem value="fuera_servicio">Fuera de Servicio</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="lineaMetro"
                  label="Línea de Metro"
                  value={formData.lineaMetro}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  placeholder="ej: Línea 1"
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="numeroFormacion"
                  label="Número de Formación"
                  value={formData.numeroFormacion}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  placeholder="ej: F-101"
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="tipoFormacion"
                  label="Tipo de Formación"
                  select
                  value={formData.tipoFormacion}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="cabeza">Cabeza</MenuItem>
                  <MenuItem value="intermedio">Intermedio</MenuItem>
                  <MenuItem value="cola">Cola</MenuItem>
                </TextField>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="responsableTecnico"
                  label="Responsable Técnico"
                  value={formData.responsableTecnico}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
                <TextField
                  name="emailResponsable"
                  label="Email del Responsable"
                  type="email"
                  value={formData.emailResponsable}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="telefonoResponsable"
                  label="Teléfono del Responsable"
                  value={formData.telefonoResponsable}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="kilometrosRecorridos"
                  label="Kilómetros Recorridos"
                  type="number"
                  value={formData.kilometrosRecorridos}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  }}
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="horasOperacion"
                  label="Horas de Operación"
                  type="number"
                  value={formData.horasOperacion}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">hrs</InputAdornment>,
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="ultimoMantenimiento"
                  label="Último Mantenimiento"
                  type="date"
                  value={formData.ultimoMantenimiento}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                <TextField
                  name="proximoMantenimiento"
                  label="Próximo Mantenimiento"
                  type="date"
                  value={formData.proximoMantenimiento}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>

            <TextField
              name="observaciones"
              label="Observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              placeholder="Notas adicionales sobre el motor..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMotor ? 'Actualizar' : 'Registrar'} Motor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de detalles del motor */}
      <Dialog 
        open={openDetailsModal} 
        onClose={handleCloseDetailsModal} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: { minHeight: '80vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {selectedMotor && getTipoIcon(selectedMotor.tipo)}
              <Typography variant="h6">
                {selectedMotor?.marca} {selectedMotor?.modelo}
              </Typography>
              <Chip 
                label={selectedMotor?.estado.replace('_', ' ')} 
                color={selectedMotor ? getEstadoColor(selectedMotor.estado) as any : 'default'}
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
            <IconButton onClick={handleCloseDetailsModal}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Información General" />
            <Tab label="Datos Técnicos" />
            <Tab label="Mantenimiento" />
            <Tab label="Edición" />
            <Tab label="Descargas" />
          </Tabs>
          
          <Box sx={{ mt: 3 }}>
            {/* Pestaña: Información General */}
            {tabValue === 0 && selectedMotor && (
              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Información Básica
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Marca</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {selectedMotor.marca}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Modelo</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {selectedMotor.modelo}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Número de Serie</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {selectedMotor.numeroSerie}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Año</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {selectedMotor.anio}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Tipo</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}>
                          {selectedMotor.tipo.replace('_', ' ')}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Ubicación
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Línea de Metro</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {selectedMotor.lineaMetro}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Número de Formación</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {selectedMotor.numeroFormacion}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Tipo de Formación</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}>
                          {selectedMotor.tipoFormacion}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Estado</Typography>
                        <Chip 
                          label={selectedMotor.estado.replace('_', ' ')} 
                          color={getEstadoColor(selectedMotor.estado) as any}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            )}

            {/* Pestaña: Datos Técnicos */}
            {tabValue === 1 && selectedMotor && (
              <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Especificaciones Técnicas
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Potencia</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.potencia}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Voltaje</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.voltaje}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Kilometraje</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#1e3a8a' }}>
                            {selectedMotor.kilometrosRecorridos.toLocaleString()} km
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Horas de Operación</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.horasOperacion.toLocaleString()} hrs
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Responsable Técnico
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Nombre</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.responsableTecnico}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Email</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.emailResponsable}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Teléfono</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.telefonoResponsable}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Observaciones
                  </Typography>
                  <Typography variant="body1">
                    {selectedMotor.observaciones || 'Sin observaciones registradas'}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Pestaña: Mantenimiento */}
            {tabValue === 2 && selectedMotor && (
              <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Programación de Mantenimiento
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Último Mantenimiento</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {new Date(selectedMotor.ultimoMantenimiento).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Próximo Mantenimiento</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {new Date(selectedMotor.proximoMantenimiento).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Días Restantes</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#1e3a8a' }}>
                            {Math.ceil((new Date(selectedMotor.proximoMantenimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Estado del Motor
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Estado Actual</Typography>
                          <Chip 
                            label={selectedMotor.estado.replace('_', ' ')} 
                            color={getEstadoColor(selectedMotor.estado) as any}
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Rendimiento</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {selectedMotor.estado === 'operativo' ? 'Óptimo' : 
                             selectedMotor.estado === 'requiere_mantenimiento' ? 'Degradado' : 'Fuera de servicio'}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Box>

                {/* Historial de Comentarios de Mantenimiento */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Historial de Mantenimientos
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflowY: 'auto' }}>
                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #1e3a8a' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1e3a8a', mb: 1 }}>
                        Ing. Carlos Mendoza - 15/01/2024 - 14:30
                      </Typography>
                      <Typography variant="body2">
                        Se realiza diagnóstico completo de 5 pasos: inspección visual, verificación eléctrica, pruebas de rendimiento, análisis de vibraciones y actualización de firmware. Motor en estado óptimo.
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #059669' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#059669', mb: 1 }}>
                        Téc. Ana Rodríguez - 28/12/2023 - 09:15
                      </Typography>
                      <Typography variant="body2">
                        Se realiza mantenimiento preventivo del sistema de tracción eléctrica. Cambio de carbones, limpieza de contactores y lubricación de rodamientos. Pruebas de funcionamiento exitosas.
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #d97706' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#d97706', mb: 1 }}>
                        Ing. Luis García - 10/12/2023 - 16:45
                      </Typography>
                      <Typography variant="body2">
                        Reemplazo de componentes del sistema de frenado regenerativo. Se detectó desgaste en pastillas de freno y se procedió al cambio. Calibración de parámetros de frenado completada.
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #6366f1' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6366f1', mb: 1 }}>
                        Téc. María González - 25/11/2023 - 11:20
                      </Typography>
                      <Typography variant="body2">
                        Inspección programada de 10,000 km. Revisión de conexiones eléctricas, verificación de torques, análisis de aceites y pruebas de aislamiento. Todas las mediciones dentro de parámetros normales.
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #dc2626' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#dc2626', mb: 1 }}>
                        Ing. Roberto Martínez - 08/11/2023 - 13:00
                      </Typography>
                      <Typography variant="body2">
                        Reparación correctiva por falla en sensor de temperatura. Se identificó cable dañado en el arnés principal. Reemplazo de sensor y reparación de cableado. Motor operativo tras pruebas.
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #059669' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#059669', mb: 1 }}>
                        Téc. Pedro Sánchez - 20/10/2023 - 08:30
                      </Typography>
                      <Typography variant="body2">
                        Mantenimiento mayor programado: desmontaje parcial, limpieza profunda de ventiladores, reemplazo de filtros, actualización de software de control y pruebas de rendimiento. Duración: 6 horas.
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, borderLeft: '4px solid #1e3a8a' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1e3a8a', mb: 1 }}>
                        Ing. Carmen López - 05/10/2023 - 15:10
                      </Typography>
                      <Typography variant="body2">
                        Diagnóstico de ruido anormal reportado por operador. Se detectó desgaste en rodamiento auxiliar. Programación de cambio para próximo mantenimiento preventivo. Motor autorizado para operación.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            )}

            {/* Pestaña: Edición */}
            {tabValue === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 4 }}>
                <Typography variant="h6">Editar Motor</Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  Haz clic en el botón de abajo para abrir el formulario de edición
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEditFromDetails}
                  sx={{ px: 4 }}
                >
                  Editar Motor
                </Button>
              </Box>
            )}

            {/* Pestaña: Descargas */}
            {tabValue === 4 && selectedMotor && (
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Documentos Disponibles
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText
                      primary="Plan de Trabajo"
                      secondary={`Plan de mantenimiento para ${selectedMotor.marca} ${selectedMotor.modelo}`}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => handleDownloadPlan(selectedMotor)}
                    >
                      Descargar
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText
                      primary="Ficha Técnica"
                      secondary="Especificaciones técnicas completas del motor"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<GetApp />}
                      onClick={() => setSnackbar({ open: true, message: 'Ficha técnica descargada', severity: 'success' })}
                    >
                      Descargar
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText
                      primary="Historial de Mantenimiento"
                      secondary="Registro completo de mantenimientos realizados"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<GetApp />}
                      onClick={() => setSnackbar({ open: true, message: 'Historial de mantenimiento descargado', severity: 'success' })}
                    >
                      Descargar
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            )}
          </Box>
        </DialogContent>
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

export default MotorModule;
