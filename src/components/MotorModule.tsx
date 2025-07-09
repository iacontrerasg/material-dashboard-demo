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
  ListItemText,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import { generatePDF, TEMPLATE_IDS } from '../templates';
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
  Assignment,
  CheckCircle,
  Error,
  Warning,
  PlayArrow,
  Visibility,
  Speed,
  Vibration,
  Update,
  SafetyCheck,
  Thermostat,
  VolumeUp,
  Api,
  Cable,
  Verified,
  Assessment
} from '@mui/icons-material';
import { Motor, DiagnosticStep, MaintenanceTask } from '../types';

interface MotorModuleProps {
  selectedMotorId?: string | null;
  onClearSelectedMotor?: () => void;
}

const MotorModule: React.FC<MotorModuleProps> = ({ selectedMotorId, onClearSelectedMotor }) => {
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
  
  // Estados para diagnósticos
  const [diagnosticSteps, setDiagnosticSteps] = useState<DiagnosticStep[]>([]);
  const [stepComments, setStepComments] = useState<{ [key: number]: string }>({});
  const [completingStep, setCompletingStep] = useState<number | null>(null);
  
  // Estados para mantenimientos
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  
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
    observaciones: '',
    projectId: '',
    projectName: ''
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
        creadoEn: '2024-01-01',
        projectId: '20240001',
        projectName: 'Modernización Sistema Eléctrico Línea 1'
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
        creadoEn: '2024-01-01',
        projectId: '20240001',
        projectName: 'Modernización Sistema Eléctrico Línea 1'
      },
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
        creadoEn: '2023-11-15',
        projectId: '20240002',
        projectName: 'Mantenimiento Preventivo Línea 2'
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
        creadoEn: '2023-11-15',
        projectId: '20240002',
        projectName: 'Mantenimiento Preventivo Línea 2'
      },
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
        creadoEn: '2024-01-05',
        projectId: '20240003',
        projectName: 'Instalación Sistema Seguridad Línea 3'
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
        creadoEn: '2024-01-05',
        projectId: '20240003',
        projectName: 'Instalación Sistema Seguridad Línea 3'
      },
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
        creadoEn: '2024-01-20',
        projectId: '20240004',
        projectName: 'Reparación Motores Tracción Línea 4'
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
        creadoEn: '2024-01-20',
        projectId: '20240004',
        projectName: 'Reparación Motores Tracción Línea 4'
      },
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
        creadoEn: '2024-01-15',
        projectId: '20240005',
        projectName: 'Inspección Técnica Línea 5'
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
        creadoEn: '2024-01-15',
        projectId: '20240005',
        projectName: 'Inspección Técnica Línea 5'
      },
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
        creadoEn: '2024-01-25',
        projectId: '20240006',
        projectName: 'Implementación Sistema Híbrido Línea 6'
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
        creadoEn: '2024-01-25',
        projectId: '20240006',
        projectName: 'Implementación Sistema Híbrido Línea 6'
      }
    ];
    setMotores(sampleMotores);
  }, []);

  // Abrir modal de detalle cuando se navega desde proyecto
  useEffect(() => {
    if (selectedMotorId && motores.length > 0) {
      const motor = motores.find(m => m.id === selectedMotorId);
      if (motor) {
        handleOpenDetailsModal(motor);
        // Limpiar el selectedMotorId después de abrir el modal
        if (onClearSelectedMotor) {
          onClearSelectedMotor();
        }
      }
    }
  }, [selectedMotorId, motores, onClearSelectedMotor]);

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
        observaciones: motor.observaciones,
        projectId: motor.projectId || '',
        projectName: motor.projectName || ''
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
        observaciones: '',
        projectId: '',
        projectName: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMotor(null);
  };

  const handleDownloadPlan = (motor: Motor) => {
    generateWorkPlan(motor);
  };

  const generateWorkPlan = async (motor: Motor) => {
    try {
      await generatePDF(TEMPLATE_IDS.WORK_PLAN, {
        motor,
        fecha: new Date().toLocaleDateString('es-MX'),
        cliente: 'Metro de la Ciudad de México',
        folio: motor.id || 'AUTO'
      }, {
        filename: `Plan_Trabajo_${motor.marca}_${motor.modelo}_${motor.numeroFormacion}.pdf`,
        format: 'letter',
        orientation: 'portrait',
        templateOptions: {
          width: '216mm',
          scale: 1.3,
          fontSize: 15,
          fontFamily: 'Arial, sans-serif',
          margins: { top: 25, right: 25, bottom: 25, left: 25 }
        }
      });
      
      setSnackbar({ 
        open: true, 
        message: `Plan de trabajo generado para ${motor.marca} ${motor.modelo}`, 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al generar el plan de trabajo', 
        severity: 'error' 
      });
    }
  };

  const generateDiagnosticReport = async (motor: Motor) => {
    try {
      await generatePDF(TEMPLATE_IDS.DIAGNOSTIC_REPORT, {
        motor,
        diagnosticSteps,
        fecha: new Date().toLocaleDateString('es-MX'),
        tecnico: motor.responsableTecnico,
        supervisor: 'Supervisor de Mantenimiento',
        observacionesGenerales: 'Diagnóstico completo del motor según protocolo estándar.',
        recomendaciones: 'Seguir con el programa de mantenimiento preventivo según las observaciones encontradas.'
      }, {
        filename: `Reporte_Diagnostico_${motor.marca}_${motor.modelo}_${motor.numeroFormacion}.pdf`,
        format: 'letter',
        orientation: 'portrait',
        templateOptions: {
          width: '216mm',
          scale: 1.3,
          fontSize: 14,
          fontFamily: 'Arial, sans-serif',
          margins: { top: 20, right: 20, bottom: 20, left: 20 }
        }
      });
      
      setSnackbar({ 
        open: true, 
        message: `Reporte de diagnóstico generado para ${motor.marca} ${motor.modelo}`, 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al generar el reporte de diagnóstico', 
        severity: 'error' 
      });
    }
  };

  const generateMaintenanceReport = async (motor: Motor) => {
    try {
      await generatePDF(TEMPLATE_IDS.MAINTENANCE_REPORT, {
        motor,
        maintenanceTasks,
        fecha: new Date().toLocaleDateString('es-MX'),
        tecnico: motor.responsableTecnico,
        supervisor: 'Supervisor de Mantenimiento',
        tipoMantenimiento: 'preventivo',
        proximoMantenimiento: motor.proximoMantenimiento,
        observacionesGenerales: 'Mantenimiento realizado según protocolo estándar.',
        repuestosUsados: [
          { codigo: 'REP001', descripcion: 'Filtro de aire', cantidad: 1, precio: 25.50 },
          { codigo: 'REP002', descripcion: 'Aceite lubricante', cantidad: 2, precio: 45.00 }
        ]
      }, {
        filename: `Reporte_Mantenimiento_${motor.marca}_${motor.modelo}_${motor.numeroFormacion}.pdf`,
        format: 'letter',
        orientation: 'portrait',
        templateOptions: {
          width: '216mm',
          scale: 1.3,
          fontSize: 14,
          fontFamily: 'Arial, sans-serif',
          margins: { top: 20, right: 20, bottom: 20, left: 20 }
        }
      });
      
      setSnackbar({ 
        open: true, 
        message: `Reporte de mantenimiento generado para ${motor.marca} ${motor.modelo}`, 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al generar el reporte de mantenimiento', 
        severity: 'error' 
      });
    }
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
    setCompletingStep(null);
    setStepComments({});
    setMaintenanceTasks([]);
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
        observaciones: selectedMotor.observaciones,
        projectId: selectedMotor.projectId || '',
        projectName: selectedMotor.projectName || ''
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

  // Función para crear los 16 pasos de diagnóstico obligatorios
  const createDiagnosticSteps = (): DiagnosticStep[] => {
    return [
      {
        id: 1,
        nombre: 'Inspección Visual Exterior',
        descripcion: 'Revisión visual completa del motor, cables, conexiones y estructura externa',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 2,
        nombre: 'Verificación de Conexiones Eléctricas',
        descripcion: 'Prueba de continuidad y verificación de todas las conexiones eléctricas',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 3,
        nombre: 'Medición de Voltaje de Funcionamiento',
        descripcion: 'Verificación de voltajes en diferentes puntos del motor',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 4,
        nombre: 'Prueba de Corriente de Carga',
        descripcion: 'Medición de corriente bajo diferentes cargas de trabajo',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 5,
        nombre: 'Análisis de Vibración',
        descripcion: 'Medición de vibraciones en diferentes puntos del motor',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 6,
        nombre: 'Verificación de Temperatura',
        descripcion: 'Monitoreo de temperatura en componentes críticos',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 7,
        nombre: 'Prueba de Rendimiento',
        descripcion: 'Evaluación del rendimiento del motor bajo carga normal',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 8,
        nombre: 'Verificación de Sistema de Frenado',
        descripcion: 'Prueba del sistema de frenado regenerativo y mecánico',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 9,
        nombre: 'Análisis de Ruido',
        descripcion: 'Medición de niveles de ruido y detección de sonidos anormales',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 10,
        nombre: 'Prueba de Aislamiento',
        descripcion: 'Verificación del aislamiento eléctrico de los bobinados',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 11,
        nombre: 'Verificación de Rodamientos',
        descripcion: 'Inspección del estado de los rodamientos y lubricación',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 12,
        nombre: 'Prueba de Sensores',
        descripcion: 'Verificación del funcionamiento de todos los sensores',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 13,
        nombre: 'Análisis de Consumo Energético',
        descripcion: 'Medición del consumo de energía en diferentes condiciones',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 14,
        nombre: 'Verificación de Sistema de Control',
        descripcion: 'Prueba del sistema de control electrónico del motor',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 15,
        nombre: 'Actualización de Firmware',
        descripcion: 'Verificación y actualización del firmware del motor',
        estado: 'pendiente',
        requiereMantenimiento: false
      },
      {
        id: 16,
        nombre: 'Reporte Final de Diagnóstico',
        descripcion: 'Compilación de resultados y recomendaciones finales',
        estado: 'pendiente',
        requiereMantenimiento: false
      }
    ];
  };

  // Función para obtener el icono del paso de diagnóstico
  const getDiagnosticIcon = (stepId: number) => {
    const icons = [
      <Visibility />, <Cable />, <ElectricBolt />, <Assessment />, <Vibration />,
      <Thermostat />, <Speed />, <Build />, <VolumeUp />, <Api />,
      <Engineering />, <Visibility />, <Assessment />, <SafetyCheck />, <Update />, <Verified />
    ];
    return icons[stepId - 1] || <Assignment />;
  };



  // Función para obtener el icono del estado del diagnóstico
  const getDiagnosticStatusIcon = (estado: string) => {
    switch (estado) {
      case 'completado': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'en_proceso': return <PlayArrow sx={{ color: '#2196f3' }} />;
      case 'fallido': return <Error sx={{ color: '#f44336' }} />;
      default: return <Warning sx={{ color: '#ff9800' }} />;
    }
  };

  // Inicializar diagnósticos cuando se abre el modal
  useEffect(() => {
    if (selectedMotor && openDetailsModal) {
      let steps: DiagnosticStep[];
      
      if (selectedMotor.diagnosticos && selectedMotor.diagnosticos.length > 0) {
        // Si el motor ya tiene diagnósticos, usar los existentes
        steps = selectedMotor.diagnosticos;
      } else {
        // Si no tiene diagnósticos, crear los pasos iniciales
        steps = createDiagnosticSteps();
        
        // Guardar los pasos iniciales en el motor
        const updatedMotor = {
          ...selectedMotor,
          diagnosticos: steps,
          ultimoDiagnostico: selectedMotor.ultimoDiagnostico || new Date().toISOString(),
          diagnosticoCompletado: false
        };

        setMotores(prev => prev.map(motor => 
          motor.id === selectedMotor.id ? updatedMotor : motor
        ));
        setSelectedMotor(updatedMotor);
      }
      
      setDiagnosticSteps(steps);
      setMaintenanceTasks(selectedMotor.mantenimientos || []);
    }
  }, [selectedMotor, openDetailsModal]);

  // Función para actualizar el estado de un paso de diagnóstico
  const updateDiagnosticStep = (stepId: number, updates: Partial<DiagnosticStep>) => {
    setDiagnosticSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    );

    // Persistir cambios de estado (como iniciar un paso)
    if (selectedMotor && (updates.estado === 'en_proceso' || updates.estado === 'pendiente')) {
      const updatedSteps = diagnosticSteps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      );

      const updatedMotor = {
        ...selectedMotor,
        diagnosticos: updatedSteps
      };

      // Actualizar el motor en la lista de motores
      setMotores(prev => prev.map(motor => 
        motor.id === selectedMotor.id ? updatedMotor : motor
      ));

      // Actualizar el motor seleccionado
      setSelectedMotor(updatedMotor);
    }
  };

  // Función para marcar un paso como completado
  const completeDiagnosticStep = (stepId: number, resultado: 'satisfactorio' | 'requiere_atencion' | 'critico') => {
    const observaciones = stepComments[stepId];
    if (!observaciones || observaciones.trim() === '') {
      setSnackbar({ open: true, message: 'Debe ingresar un comentario para completar el diagnóstico', severity: 'error' });
      return;
    }

    const updatedStep = {
      estado: 'completado' as const,
      resultado,
      observaciones,
      fechaEjecucion: new Date().toISOString(),
      tecnicoResponsable: 'Usuario Actual',
      requiereMantenimiento: resultado !== 'satisfactorio'
    };

    // Actualizar el paso en el estado local
    updateDiagnosticStep(stepId, updatedStep);

    // Persistir en el motor
    if (selectedMotor) {
      const updatedSteps = diagnosticSteps.map(step => 
        step.id === stepId ? { ...step, ...updatedStep } : step
      );

      // Generar mantenimiento automáticamente si es necesario
      let newMaintenanceTasks: MaintenanceTask[] = [];
      if (resultado !== 'satisfactorio') {
        const currentStep = diagnosticSteps.find(s => s.id === stepId);
        if (currentStep) {
          const maintenanceTask = generateMaintenanceTask(currentStep, resultado, observaciones);
          newMaintenanceTasks = [...(selectedMotor.mantenimientos || []), maintenanceTask];
          setMaintenanceTasks(newMaintenanceTasks);
        }
      }

      const updatedMotor = {
        ...selectedMotor,
        diagnosticos: updatedSteps,
        ultimoDiagnostico: new Date().toISOString(),
        diagnosticoCompletado: updatedSteps.every(step => step.estado === 'completado'),
        mantenimientos: resultado !== 'satisfactorio' ? newMaintenanceTasks : selectedMotor.mantenimientos || []
      };

      // Actualizar el motor en la lista de motores
      setMotores(prev => prev.map(motor => 
        motor.id === selectedMotor.id ? updatedMotor : motor
      ));

      // Actualizar el motor seleccionado
      setSelectedMotor(updatedMotor);

      const successMessage = resultado !== 'satisfactorio' 
        ? `Paso "${diagnosticSteps.find(s => s.id === stepId)?.nombre}" completado. Mantenimiento generado automáticamente.`
        : `Paso "${diagnosticSteps.find(s => s.id === stepId)?.nombre}" completado exitosamente`;

      setSnackbar({ 
        open: true, 
        message: successMessage, 
        severity: 'success' 
      });
    }

    // Limpiar el comentario y el estado de completando
    setStepComments(prev => ({ ...prev, [stepId]: '' }));
    setCompletingStep(null);
  };

  // Función para manejar el cambio de comentario
  const handleCommentChange = (stepId: number, value: string) => {
    setStepComments(prev => ({ ...prev, [stepId]: value }));
  };

  // Función para generar mantenimiento automáticamente
  const generateMaintenanceTask = (step: DiagnosticStep, resultado: 'satisfactorio' | 'requiere_atencion' | 'critico', observaciones: string): MaintenanceTask => {
    const now = new Date();
    const estimatedDate = new Date(now.getTime() + (resultado === 'critico' ? 1 : resultado === 'requiere_atencion' ? 7 : 30) * 24 * 60 * 60 * 1000);
    
    return {
      id: `maint_${step.id}_${Date.now()}`,
      diagnosticStepId: step.id,
      titulo: `Mantenimiento: ${step.nombre}`,
      descripcion: `${step.descripcion}. Observaciones: ${observaciones}`,
      tipo: resultado === 'critico' ? 'correctivo' : resultado === 'requiere_atencion' ? 'predictivo' : 'preventivo',
      prioridad: resultado === 'critico' ? 'critica' : resultado === 'requiere_atencion' ? 'alta' : 'media',
      estado: 'pendiente',
      fechaCreacion: now.toISOString(),
      fechaEstimada: estimatedDate.toISOString(),
      tecnicoAsignado: 'Por asignar',
      observaciones: observaciones,
      resultadoDiagnostico: resultado,
      pasoOriginal: step.nombre
    };
  };

  // Función para actualizar el estado de un mantenimiento
  const updateMaintenanceTask = (taskId: string, updates: Partial<MaintenanceTask>) => {
    if (selectedMotor) {
      const updatedTasks = maintenanceTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      );

      const updatedMotor = {
        ...selectedMotor,
        mantenimientos: updatedTasks
      };

      setMotores(prev => prev.map(motor => 
        motor.id === selectedMotor.id ? updatedMotor : motor
      ));
      setSelectedMotor(updatedMotor);
      setMaintenanceTasks(updatedTasks);
    }
  };

  // Función para completar un mantenimiento
  const completeMaintenanceTask = (taskId: string, observaciones?: string) => {
    updateMaintenanceTask(taskId, {
      estado: 'completado',
      fechaCompletado: new Date().toISOString(),
      observaciones: observaciones || ''
    });

    setSnackbar({ 
      open: true, 
      message: 'Mantenimiento completado exitosamente', 
      severity: 'success' 
    });
  };

  // Función para obtener el color de prioridad
  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'critica': return 'error';
      case 'alta': return 'warning';
      case 'media': return 'info';
      case 'baja': return 'success';
      default: return 'default';
    }
  };

  // Función para obtener el color del estado de mantenimiento
  const getMaintenanceStatusColor = (estado: string) => {
    switch (estado) {
      case 'completado': return 'success';
      case 'en_proceso': return 'info';
      case 'cancelado': return 'error';
      default: return 'default';
    }
  };

  // Función para resetear todos los diagnósticos
  const resetDiagnostics = () => {
    if (selectedMotor) {
      const freshSteps = createDiagnosticSteps();
      
      const updatedMotor = {
        ...selectedMotor,
        diagnosticos: freshSteps,
        ultimoDiagnostico: new Date().toISOString(),
        diagnosticoCompletado: false,
        mantenimientos: [] // Limpiar mantenimientos también
      };

      setMotores(prev => prev.map(motor => 
        motor.id === selectedMotor.id ? updatedMotor : motor
      ));
      setSelectedMotor(updatedMotor);
      setDiagnosticSteps(freshSteps);
      setMaintenanceTasks([]);
      setStepComments({});
      setCompletingStep(null);

      setSnackbar({ 
        open: true, 
        message: 'Diagnósticos y mantenimientos reiniciados correctamente', 
        severity: 'success' 
      });
    }
  };

  const filteredMotores = motores.filter(motor => {
    const matchesSearch = motor.responsableTecnico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.lineaMetro.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motor.numeroFormacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (motor.projectId && motor.projectId.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (motor.projectName && motor.projectName.toLowerCase().includes(searchTerm.toLowerCase()));
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
            placeholder="Buscar por motor, línea, proyecto..."
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
              <TableCell sx={{ fontWeight: 'bold' }}>Proyecto Asociado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Kilometraje</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Diagnóstico</TableCell>
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
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#1e3a8a' }}>
                      {motor.projectId || 'Sin asignar'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200 }}>
                      {motor.projectName || 'No asociado a proyecto'}
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
                  <Box>
                    {motor.diagnosticos ? (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {motor.diagnosticos.filter(d => d.estado === 'completado').length}/16 pasos
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(motor.diagnosticos.filter(d => d.estado === 'completado').length / 16) * 100}
                          sx={{ width: 80, height: 4, borderRadius: 2 }}
                        />
                        {motor.diagnosticoCompletado && (
                          <Chip 
                            label="Completo" 
                            color="success" 
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No iniciado
                      </Typography>
                    )}
                  </Box>
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
            <Tab label="Diagnósticos" />
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

            {/* Pestaña: Diagnósticos */}
            {tabValue === 1 && selectedMotor && (
              <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                {/* Progreso general de diagnósticos */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assessment />
                      Progreso de Diagnósticos
                    </Typography>
                    <Button
                      variant="outlined"
                      color="warning"
                      size="small"
                      onClick={resetDiagnostics}
                      sx={{ minWidth: 'auto' }}
                    >
                      Reiniciar Diagnósticos
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {diagnosticSteps.filter(step => step.estado === 'completado').length} de {diagnosticSteps.length} pasos completados
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(diagnosticSteps.filter(step => step.estado === 'completado').length / diagnosticSteps.length) * 100}
                      sx={{ flex: 1, height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  
                  {selectedMotor?.ultimoDiagnostico && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Último diagnóstico: {new Date(selectedMotor.ultimoDiagnostico).toLocaleString()}
                    </Typography>
                  )}
                  
                  {diagnosticSteps.filter(step => step.estado === 'completado').length === diagnosticSteps.length && (
                    <Chip 
                      label="Diagnóstico Completado" 
                      color="success" 
                      icon={<CheckCircle />}
                      sx={{ mb: 1 }}
                    />
                  )}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    💾 Los diagnósticos se guardan automáticamente
                  </Typography>
                </Paper>

                {/* Lista de pasos de diagnóstico */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Pasos de Diagnóstico Obligatorios
                  </Typography>
                  <Stepper orientation="vertical" nonLinear>
                    {diagnosticSteps.map((step, index) => (
                      <Step key={step.id} active={true} completed={step.estado === 'completado'}>
                        <StepLabel
                          StepIconComponent={() => (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getDiagnosticIcon(step.id)}
                              {getDiagnosticStatusIcon(step.estado)}
                            </Box>
                          )}
                        >
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {step.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.descripcion}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, mb: 2 }}>
                            {step.estado === 'completado' ? (
                              <Box>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Resultado:</strong> {step.resultado}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Fecha:</strong> {step.fechaEjecucion ? new Date(step.fechaEjecucion).toLocaleString() : 'No ejecutado'}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Técnico:</strong> {step.tecnicoResponsable || 'No asignado'}
                                </Typography>
                                {step.observaciones && (
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Observaciones:</strong> {step.observaciones}
                                  </Typography>
                                )}
                                {step.requiereMantenimiento && (
                                  <Chip 
                                    label={`Requiere Mantenimiento ${step.tipoMantenimiento || 'Correctivo'}`}
                                    color="warning"
                                    size="small"
                                  />
                                )}
                              </Box>
                                                         ) : (
                               <Box>
                                 <Typography variant="body2" sx={{ mb: 2 }}>
                                   Estado: {step.estado}
                                 </Typography>
                                 
                                 {/* Botones para iniciar y completar */}
                                 {completingStep !== step.id ? (
                                   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                     <Button
                                       size="small"
                                       variant="outlined"
                                       color="info"
                                       onClick={() => updateDiagnosticStep(step.id, { estado: 'en_proceso' })}
                                       disabled={step.estado === 'en_proceso'}
                                     >
                                       Iniciar
                                     </Button>
                                     <Button
                                       size="small"
                                       variant="contained"
                                       color="success"
                                       onClick={() => setCompletingStep(step.id)}
                                       disabled={step.estado !== 'en_proceso'}
                                     >
                                       Completar (OK)
                                     </Button>
                                     <Button
                                       size="small"
                                       variant="contained"
                                       color="warning"
                                       onClick={() => setCompletingStep(step.id)}
                                       disabled={step.estado !== 'en_proceso'}
                                     >
                                       Requiere Atención
                                     </Button>
                                     <Button
                                       size="small"
                                       variant="contained"
                                       color="error"
                                       onClick={() => setCompletingStep(step.id)}
                                       disabled={step.estado !== 'en_proceso'}
                                     >
                                       Crítico
                                     </Button>
                                   </Box>
                                 ) : (
                                   /* Formulario para ingresar comentarios */
                                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                     <TextField
                                       label="Comentario Obligatorio"
                                       placeholder="Ingrese sus observaciones sobre este paso del diagnóstico..."
                                       value={stepComments[step.id] || ''}
                                       onChange={(e) => handleCommentChange(step.id, e.target.value)}
                                       multiline
                                       rows={3}
                                       fullWidth
                                       required
                                       error={!stepComments[step.id] || stepComments[step.id].trim() === ''}
                                       helperText={(!stepComments[step.id] || stepComments[step.id].trim() === '') ? 'El comentario es obligatorio' : ''}
                                     />
                                     <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                       <Button
                                         size="small"
                                         variant="contained"
                                         color="success"
                                         onClick={() => completeDiagnosticStep(step.id, 'satisfactorio')}
                                         disabled={!stepComments[step.id] || stepComments[step.id].trim() === ''}
                                       >
                                         ✓ Satisfactorio
                                       </Button>
                                       <Button
                                         size="small"
                                         variant="contained"
                                         color="warning"
                                         onClick={() => completeDiagnosticStep(step.id, 'requiere_atencion')}
                                         disabled={!stepComments[step.id] || stepComments[step.id].trim() === ''}
                                       >
                                         ⚠ Requiere Atención
                                       </Button>
                                       <Button
                                         size="small"
                                         variant="contained"
                                         color="error"
                                         onClick={() => completeDiagnosticStep(step.id, 'critico')}
                                         disabled={!stepComments[step.id] || stepComments[step.id].trim() === ''}
                                       >
                                         ⚠ Crítico
                                       </Button>
                                       <Button
                                         size="small"
                                         variant="outlined"
                                         onClick={() => {
                                           setCompletingStep(null);
                                           setStepComments(prev => ({ ...prev, [step.id]: '' }));
                                         }}
                                       >
                                         Cancelar
                                       </Button>
                                     </Box>
                                   </Box>
                                 )}
                               </Box>
                             )}
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Paper>

                {/* Resumen de resultados */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Resumen de Diagnóstico
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`${diagnosticSteps.filter(step => step.resultado === 'satisfactorio').length} Satisfactorios`}
                      color="success"
                      variant="outlined"
                    />
                    <Chip 
                      label={`${diagnosticSteps.filter(step => step.resultado === 'requiere_atencion').length} Requieren Atención`}
                      color="warning"
                      variant="outlined"
                    />
                    <Chip 
                      label={`${diagnosticSteps.filter(step => step.resultado === 'critico').length} Críticos`}
                      color="error"
                      variant="outlined"
                    />
                    <Chip 
                      label={`${diagnosticSteps.filter(step => step.requiereMantenimiento).length} Requieren Mantenimiento`}
                      color="info"
                      variant="outlined"
                    />
                  </Box>
                </Paper>
              </Box>
            )}

            {/* Pestaña: Datos Técnicos */}
            {tabValue === 2 && selectedMotor && (
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
            {tabValue === 3 && selectedMotor && (
              <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                {/* Mantenimientos Generados del Diagnóstico */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Build />
                    Mantenimientos Generados del Diagnóstico
                  </Typography>
                  
                  {maintenanceTasks.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {maintenanceTasks.map((task) => (
                        <Paper key={task.id} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                              {task.titulo}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Chip 
                                label={task.prioridad} 
                                color={getPriorityColor(task.prioridad) as any}
                                size="small"
                                sx={{ textTransform: 'capitalize' }}
                              />
                              <Chip 
                                label={task.estado} 
                                color={getMaintenanceStatusColor(task.estado) as any}
                                size="small"
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {task.descripcion}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
                            <Typography variant="body2">
                              <strong>Tipo:</strong> {task.tipo}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Origen:</strong> {task.pasoOriginal}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Creado:</strong> {new Date(task.fechaCreacion).toLocaleDateString()}
                            </Typography>
                            {task.fechaEstimada && (
                              <Typography variant="body2">
                                <strong>Estimado:</strong> {new Date(task.fechaEstimada).toLocaleDateString()}
                              </Typography>
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Typography variant="body2">
                              <strong>Técnico:</strong> {task.tecnicoAsignado}
                            </Typography>
                            {task.estado === 'pendiente' && (
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="info"
                                  onClick={() => updateMaintenanceTask(task.id, { estado: 'en_proceso' })}
                                >
                                  Iniciar
                                </Button>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="success"
                                  onClick={() => completeMaintenanceTask(task.id, 'Completado desde diagnóstico')}
                                >
                                  Completar
                                </Button>
                              </Box>
                            )}
                            {task.estado === 'en_proceso' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => completeMaintenanceTask(task.id, 'Completado desde diagnóstico')}
                              >
                                Completar
                              </Button>
                            )}
                            {task.estado === 'completado' && task.fechaCompletado && (
                              <Typography variant="body2" color="success.main">
                                <strong>Completado:</strong> {new Date(task.fechaCompletado).toLocaleDateString()}
                              </Typography>
                            )}
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                      No hay mantenimientos generados desde el diagnóstico.
                      <br />
                      Los mantenimientos se generan automáticamente cuando un paso del diagnóstico requiere atención.
                    </Typography>
                  )}
                </Paper>

                {/* Información General de Mantenimiento */}
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
                        Resumen de Mantenimientos
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Total de Mantenimientos</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {maintenanceTasks.length}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Pendientes</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#ff9800' }}>
                            {maintenanceTasks.filter(t => t.estado === 'pendiente').length}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Completados</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#4caf50' }}>
                            {maintenanceTasks.filter(t => t.estado === 'completado').length}
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
            {tabValue === 4 && (
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
            {tabValue === 5 && selectedMotor && (
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
                      <Assessment />
                    </ListItemIcon>
                    <ListItemText
                      primary="Reporte de Diagnóstico"
                      secondary="Informe completo con resultados de diagnóstico"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => generateDiagnosticReport(selectedMotor)}
                    >
                      Generar
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Build />
                    </ListItemIcon>
                    <ListItemText
                      primary="Reporte de Mantenimiento"
                      secondary="Informe detallado de tareas de mantenimiento"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => generateMaintenanceReport(selectedMotor)}
                    >
                      Generar
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
