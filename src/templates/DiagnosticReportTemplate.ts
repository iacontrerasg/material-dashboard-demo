import { PDFTemplate, TemplateData, TemplateOptions } from '../types';
import { Motor, DiagnosticStep } from '../types';

export interface DiagnosticReportData extends TemplateData {
  motor: Motor;
  diagnosticSteps: DiagnosticStep[];
  fecha?: string;
  tecnico?: string;
  supervisor?: string;
  observacionesGenerales?: string;
  recomendaciones?: string;
}

export const DiagnosticReportTemplate: PDFTemplate = {
  id: 'diagnostic-report',
  name: 'Reporte de Diagnóstico',
  description: 'Template para generar reportes de diagnóstico de motores',
  
  generate: (data: TemplateData, options?: TemplateOptions): string => {
    const reportData = data as DiagnosticReportData;
    const { motor, diagnosticSteps } = reportData;
    
    const defaultOptions = {
      fontSize: 14,
      fontFamily: 'Arial, sans-serif',
      margins: { top: 20, right: 20, bottom: 20, left: 20 }
    };
    
    const opts = { ...defaultOptions, ...options };
    
    const fecha = reportData.fecha || new Date().toLocaleDateString('es-MX');
    const tecnico = reportData.tecnico || 'No especificado';
    const supervisor = reportData.supervisor || 'No especificado';
    const observacionesGenerales = reportData.observacionesGenerales || '';
    const recomendaciones = reportData.recomendaciones || '';
    
    const getEstadoColor = (estado: string) => {
      switch (estado) {
        case 'satisfactorio': return '#4caf50';
        case 'requiere_atencion': return '#ff9800';
        case 'critico': return '#f44336';
        default: return '#9e9e9e';
      }
    };
    
    const getEstadoTexto = (estado: string) => {
      switch (estado) {
        case 'satisfactorio': return 'Satisfactorio';
        case 'requiere_atencion': return 'Requiere Atención';
        case 'critico': return 'Crítico';
        default: return 'Pendiente';
      }
    };
    
    return `
      <div style="padding: ${opts.margins.top}px; font-family: ${opts.fontFamily}; width: 100%; font-size: ${opts.fontSize}px; line-height: 1.4; box-sizing: border-box;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 3px solid #1976d2; padding-bottom: 15px;">
          <div style="display: flex; align-items: center;">
            <div style="width: 60px; height: 60px; background: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px; font-size: 18px;">
              DR
            </div>
            <div>
              <div style="font-size: 26px; font-weight: bold; color: #1976d2;">REPORTE DE DIAGNÓSTICO</div>
              <div style="font-size: 16px; color: #666;">Sistema de Motores</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #666;">FECHA:</div>
            <div style="font-size: 16px; font-weight: bold;">${fecha}</div>
          </div>
        </div>

        <!-- Información del Motor -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; font-size: 18px;">Información del Motor</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
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
                <strong>Potencia:</strong> ${motor.potencia}
              </div>
            </div>
          </div>
        </div>

        <!-- Personal -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; font-size: 18px;">Personal Responsable</h3>
          <div style="display: flex; gap: 30px;">
            <div style="flex: 1;">
              <strong>Técnico:</strong> ${tecnico}
            </div>
            <div style="flex: 1;">
              <strong>Supervisor:</strong> ${supervisor}
            </div>
          </div>
        </div>

        <!-- Resultados del Diagnóstico -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; font-size: 18px;">Resultados del Diagnóstico</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #e3f2fd;">
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Paso</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Descripción</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: center; font-size: 13px;">Estado</th>
                <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-size: 13px;">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              ${diagnosticSteps.map((step, index) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${index + 1}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${step.nombre}</td>
                  <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-size: 12px;">
                    <span style="background: ${getEstadoColor(step.estado || 'pendiente')}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">
                      ${getEstadoTexto(step.estado || 'pendiente')}
                    </span>
                  </td>
                  <td style="border: 1px solid #ddd; padding: 10px; font-size: 12px;">${step.observaciones || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Observaciones Generales -->
        ${observacionesGenerales ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; font-size: 18px;">Observaciones Generales</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 13px;">
            ${observacionesGenerales}
          </div>
        </div>
        ` : ''}

        <!-- Recomendaciones -->
        ${recomendaciones ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; font-size: 18px;">Recomendaciones</h3>
          <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800; font-size: 13px;">
            ${recomendaciones}
          </div>
        </div>
        ` : ''}

        <!-- Footer -->
        <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 11px; color: #666;">
              Reporte generado automáticamente - ${fecha}
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