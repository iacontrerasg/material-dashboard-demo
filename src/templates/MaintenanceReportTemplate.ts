import { PDFTemplate, TemplateData, TemplateOptions } from '../types';
import { Motor, MaintenanceTask } from '../types';

export interface MaintenanceReportData extends TemplateData {
  motor: Motor;
  maintenanceTasks: MaintenanceTask[];
  fecha?: string;
  tecnico?: string;
  supervisor?: string;
  tipoMantenimiento?: 'preventivo' | 'correctivo' | 'predictivo';
  proximoMantenimiento?: string;
  observacionesGenerales?: string;
  repuestosUsados?: Array<{
    codigo: string;
    descripcion: string;
    cantidad: number;
    precio?: number;
  }>;
}

export const MaintenanceReportTemplate: PDFTemplate = {
  id: 'maintenance-report',
  name: 'Reporte de Mantenimiento',
  description: 'Template para generar reportes de mantenimiento de motores',
  
  generate: (data: TemplateData, options?: TemplateOptions): string => {
    const reportData = data as MaintenanceReportData;
    const { motor, maintenanceTasks } = reportData;
    
    const defaultOptions = {
      fontSize: 14,
      fontFamily: 'Arial, sans-serif',
      margins: { top: 20, right: 20, bottom: 20, left: 20 }
    };
    
    const opts = { ...defaultOptions, ...options };
    
    const fecha = reportData.fecha || new Date().toLocaleDateString('es-MX');
    const tecnico = reportData.tecnico || 'No especificado';
    const supervisor = reportData.supervisor || 'No especificado';
    const tipoMantenimiento = reportData.tipoMantenimiento || 'preventivo';
    const proximoMantenimiento = reportData.proximoMantenimiento || '';
    const observacionesGenerales = reportData.observacionesGenerales || '';
    const repuestosUsados = reportData.repuestosUsados || [];
    
    const getTipoMantenimientoColor = (tipo: string) => {
      switch (tipo) {
        case 'preventivo': return '#4caf50';
        case 'correctivo': return '#f44336';
        case 'predictivo': return '#2196f3';
        default: return '#9e9e9e';
      }
    };
    
    const getTipoMantenimientoTexto = (tipo: string) => {
      switch (tipo) {
        case 'preventivo': return 'Preventivo';
        case 'correctivo': return 'Correctivo';
        case 'predictivo': return 'Predictivo';
        default: return 'No especificado';
      }
    };
    
    const getEstadoColor = (estado: string) => {
      switch (estado) {
        case 'completada': return '#4caf50';
        case 'en_progreso': return '#ff9800';
        case 'pendiente': return '#9e9e9e';
        default: return '#9e9e9e';
      }
    };
    
    const getEstadoTexto = (estado: string) => {
      switch (estado) {
        case 'completada': return 'Completada';
        case 'en_progreso': return 'En Progreso';
        case 'pendiente': return 'Pendiente';
        default: return 'Sin estado';
      }
    };
    
    return `
      <div style="padding: ${opts.margins.top}px; font-family: ${opts.fontFamily}; width: 100%; font-size: ${opts.fontSize}px; line-height: 1.4; box-sizing: border-box;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 3px solid #4caf50; padding-bottom: 15px;">
          <div style="display: flex; align-items: center;">
            <div style="width: 60px; height: 60px; background: #4caf50; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px; font-size: 18px;">
              RM
            </div>
            <div>
              <div style="font-size: 26px; font-weight: bold; color: #4caf50;">REPORTE DE MANTENIMIENTO</div>
              <div style="font-size: 16px; color: #666;">Sistema de Motores</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #666;">FECHA:</div>
            <div style="font-size: 16px; font-weight: bold;">${fecha}</div>
            <div style="margin-top: 10px; padding: 5px 10px; background: ${getTipoMantenimientoColor(tipoMantenimiento)}; color: white; border-radius: 15px; font-size: 12px; text-align: center;">
              ${getTipoMantenimientoTexto(tipoMantenimiento)}
            </div>
          </div>
        </div>

        <!-- Información del Motor -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #4caf50; margin-bottom: 15px; font-size: 18px;">Información del Motor</h3>
          <div style="background: #f1f8e9; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
            <div style="display: flex; margin-bottom: 10px;">
              <div style="flex: 1; margin-right: 20px;">
                <strong>Marca:</strong> ${motor.marca}
              </div>
              <div style="flex: 1;">
                <strong>Modelo:</strong> ${motor.modelo}
              </div>
            </div>
            <div style="display: flex; margin-bottom: 10px;">
              <div style="flex: 1; margin-right: 20px;">
                <strong>Número de Serie:</strong> ${motor.numeroSerie}
              </div>
              <div style="flex: 1;">
                <strong>Línea:</strong> ${motor.lineaMetro}
              </div>
            </div>
            <div style="display: flex; margin-bottom: 10px;">
              <div style="flex: 1; margin-right: 20px;">
                <strong>Formación:</strong> ${motor.numeroFormacion}
              </div>
              <div style="flex: 1;">
                <strong>Horas de Operación:</strong> ${motor.horasOperacion || 0} hrs
              </div>
            </div>
            <div style="display: flex;">
              <div style="flex: 1; margin-right: 20px;">
                <strong>Kilómetros Recorridos:</strong> ${motor.kilometrosRecorridos || 0} km
              </div>
              <div style="flex: 1;">
                <strong>Último Mantenimiento:</strong> ${motor.ultimoMantenimiento || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <!-- Personal -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #4caf50; margin-bottom: 15px; font-size: 18px;">Personal Responsable</h3>
          <div style="display: flex; gap: 30px;">
            <div style="flex: 1;">
              <strong>Técnico:</strong> ${tecnico}
            </div>
            <div style="flex: 1;">
              <strong>Supervisor:</strong> ${supervisor}
            </div>
          </div>
        </div>

        <!-- Tareas de Mantenimiento -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #4caf50; margin-bottom: 15px; font-size: 18px;">Tareas Realizadas</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #e8f5e8;">
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Tarea</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Descripción</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-size: 13px;">Prioridad</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-size: 13px;">Estado</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              ${maintenanceTasks.map((task, index) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${task.titulo}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${task.descripcion}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-size: 12px;">
                    <span style="background: ${task.prioridad === 'alta' ? '#f44336' : task.prioridad === 'media' ? '#ff9800' : '#4caf50'}; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">
                      ${task.prioridad.toUpperCase()}
                    </span>
                  </td>
                  <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-size: 12px;">
                    <span style="background: ${getEstadoColor(task.estado)}; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px;">
                      ${getEstadoTexto(task.estado)}
                    </span>
                  </td>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${task.observaciones || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Repuestos Utilizados -->
        ${repuestosUsados.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #4caf50; margin-bottom: 15px; font-size: 18px;">Repuestos Utilizados</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #e8f5e8;">
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Código</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Descripción</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-size: 13px;">Cantidad</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: right; font-size: 13px;">Precio Unit.</th>
              </tr>
            </thead>
            <tbody>
              ${repuestosUsados.map(repuesto => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${repuesto.codigo}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${repuesto.descripcion}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-size: 12px;">${repuesto.cantidad}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; text-align: right; font-size: 12px;">
                    ${repuesto.precio ? `$${repuesto.precio.toFixed(2)}` : 'N/A'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ` : ''}

        <!-- Próximo Mantenimiento -->
        ${proximoMantenimiento ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #4caf50; margin-bottom: 15px; font-size: 18px;">Próximo Mantenimiento</h3>
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196f3;">
            <strong>Fecha programada:</strong> ${proximoMantenimiento}
          </div>
        </div>
        ` : ''}

        <!-- Observaciones Generales -->
        ${observacionesGenerales ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #4caf50; margin-bottom: 15px; font-size: 18px;">Observaciones Generales</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 13px;">
            ${observacionesGenerales}
          </div>
        </div>
        ` : ''}

        <!-- Footer -->
        <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 11px; color: #666;">
              Reporte de mantenimiento generado - ${fecha}
            </div>
            <div style="font-size: 11px; color: #666;">
              Sistema de Gestión de Motores
            </div>
          </div>
        </div>
      </div>
    `;
  }
}; 