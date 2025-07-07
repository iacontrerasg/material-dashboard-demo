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
  CalendarToday,
  Business as BusinessIcon
} from '@mui/icons-material';
import { Contract } from '../types';

const ContractModule: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
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
    status: 'pendiente' as Contract['status']
  });

  // Cargar contratos de ejemplo al iniciar
  useEffect(() => {
    const sampleContracts: Contract[] = [
      {
        id: '1',
        clientName: 'Juan Pérez',
        clientEmail: 'juan.perez@email.com',
        clientPhone: '+52 555 1234567',
        serviceName: 'Desarrollo Web',
        serviceDescription: 'Sitio web corporativo con sistema de gestión',
        amount: 25000,
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        status: 'activo',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        clientName: 'María González',
        clientEmail: 'maria.gonzalez@empresa.com',
        clientPhone: '+52 555 2345678',
        serviceName: 'Consultoría IT',
        serviceDescription: 'Asesoramiento en infraestructura tecnológica',
        amount: 18000,
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        status: 'pendiente',
        createdAt: '2024-01-20'
      }
    ];
    setContracts(sampleContracts);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContract: Contract = {
      id: editingContract?.id || Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: editingContract?.createdAt || new Date().toISOString()
    };

    if (editingContract) {
      setContracts(prev => prev.map(contract => 
        contract.id === editingContract.id ? newContract : contract
      ));
      setSnackbar({ open: true, message: 'Contrato actualizado exitosamente', severity: 'success' });
    } else {
      setContracts(prev => [...prev, newContract]);
      setSnackbar({ open: true, message: 'Contrato creado exitosamente', severity: 'success' });
    }

    handleCloseDialog();
  };

  const handleOpenDialog = (contract?: Contract) => {
    if (contract) {
      setEditingContract(contract);
      setFormData({
        clientName: contract.clientName,
        clientEmail: contract.clientEmail,
        clientPhone: contract.clientPhone,
        serviceName: contract.serviceName,
        serviceDescription: contract.serviceDescription,
        amount: contract.amount.toString(),
        startDate: contract.startDate,
        endDate: contract.endDate,
        status: contract.status
      });
    } else {
      setEditingContract(null);
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
    setEditingContract(null);
  };

  const handleDelete = (id: string) => {
    setContracts(prev => prev.filter(contract => contract.id !== id));
    setSnackbar({ open: true, message: 'Contrato eliminado', severity: 'success' });
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

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || contract.status === filterStatus;
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
                    {contracts.length}
                  </Typography>
                  <Typography variant="body2">
                    Total Contratos
                  </Typography>
                </Box>
                <BusinessIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    {contracts.filter(c => c.status === 'activo').length}
                  </Typography>
                  <Typography variant="body2">
                    Contratos Activos
                  </Typography>
                </Box>
                <CalendarToday sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Controles */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar contratos..."
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

      {/* Tabla de contratos */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Servicio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {contract.clientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contract.clientEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {contract.serviceName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                    ${contract.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={contract.status}
                    color={getStatusColor(contract.status) as any}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary" onClick={() => handleOpenDialog(contract)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(contract.id)}>
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

      {/* Dialog para crear/editar contrato */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingContract ? 'Editar Contrato' : 'Nuevo Contrato'}
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
            {editingContract ? 'Actualizar' : 'Crear'} Contrato
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

export default ContractModule; 