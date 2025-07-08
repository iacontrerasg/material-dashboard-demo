export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  serviceDescription: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'pendiente' | 'activo' | 'completado' | 'cancelado';
  createdAt: string;
  associatedMotors?: Motor[];
}

export interface DiagnosticStep {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'fallido';
  resultado?: 'satisfactorio' | 'requiere_atencion' | 'critico';
  observaciones?: string;
  fechaEjecucion?: string;
  tecnicoResponsable?: string;
  requiereMantenimiento?: boolean;
  tipoMantenimiento?: 'preventivo' | 'correctivo' | 'predictivo';
}

export interface MaintenanceTask {
  id: string;
  diagnosticStepId: number;
  titulo: string;
  descripcion: string;
  tipo: 'preventivo' | 'correctivo' | 'predictivo';
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
  fechaCreacion: string;
  fechaEstimada?: string;
  fechaCompletado?: string;
  tecnicoAsignado?: string;
  observaciones?: string;
  resultadoDiagnostico: 'satisfactorio' | 'requiere_atencion' | 'critico';
  pasoOriginal: string;
}

export interface Motor {
  id: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  tipo: 'electrico' | 'diesel_electrico' | 'traccion_electrica' | 'hibrido';
  potencia: string;
  voltaje: string;
  anio: number;
  lineaMetro: string;
  numeroFormacion: string;
  tipoFormacion: 'cabeza' | 'intermedio' | 'cola';
  responsableTecnico: string;
  emailResponsable: string;
  telefonoResponsable: string;
  estado: 'operativo' | 'en_mantenimiento' | 'requiere_mantenimiento' | 'fuera_servicio';
  ultimoMantenimiento: string;
  proximoMantenimiento: string;
  kilometrosRecorridos: number;
  horasOperacion: number;
  observaciones: string;
  creadoEn: string;
  projectId?: string;
  projectName?: string;
  diagnosticos?: DiagnosticStep[];
  ultimoDiagnostico?: string;
  proximoDiagnostico?: string;
  diagnosticoCompletado?: boolean;
  mantenimientos?: MaintenanceTask[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
} 