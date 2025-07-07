export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Contract {
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
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
} 