import { PDFTemplate, TemplateData, TemplateOptions } from '../types';
import { Motor } from '../types';

export interface WorkPlanData extends TemplateData {
  motor: Motor;
  fecha?: string;
  cliente?: string;
  folio?: string;
  objetivos?: string;
  descripcion?: string;
  elaboradoPor?: string;
  revisadoPor?: string;
  version?: string;
}

export const WorkPlanTemplate: PDFTemplate = {
  id: 'work-plan',
  name: 'Plan de Trabajo',
  description: 'Template para generar planes de trabajo de motores',
  
  generate: (data: TemplateData, options?: TemplateOptions): string => {
    const workPlanData = data as WorkPlanData;
    const { motor } = workPlanData;
    
    const defaultOptions = {
      fontSize: 15,
      fontFamily: 'Arial, sans-serif',
      margins: { top: 25, right: 25, bottom: 25, left: 25 }
    };
    
    const opts = { ...defaultOptions, ...options };
    
    const fecha = workPlanData.fecha || new Date().toLocaleDateString('es-MX');
    const cliente = workPlanData.cliente || 'Metro de la Ciudad de México';
    const folio = workPlanData.folio || motor.id || 'AUTO';
    const objetivos = workPlanData.objetivos || 'Realizar mantenimiento preventivo y correctivo del motor de tracción según especificaciones técnicas del fabricante, asegurando el óptimo funcionamiento del sistema de transporte metro.';
    const descripcion = workPlanData.descripcion || motor.observaciones || 'Plan de mantenimiento completo que incluye inspección, limpieza, lubricación, ajustes y pruebas de funcionamiento del motor de tracción.';
    const version = workPlanData.version || 'FOR-IOP-73-V5';
    
    return `
      <div style="padding: ${opts.margins.top}px; font-family: ${opts.fontFamily}; width: 100%; font-size: ${opts.fontSize}px; line-height: 1.3; box-sizing: border-box;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 3px solid #000; padding-bottom: 12px;">
          <div style="display: flex; align-items: center;">
            <div style="width: 60px; height: 60px; background: #d32f2f; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px; font-size: 20px;">
              FMD
            </div>
            <div>
              <div style="font-size: 24px; font-weight: bold; color: #d32f2f;">PLAN DE TRABAJO</div>
              <div style="font-size: 14px; color: #666;">Industrias FMD</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #666;">FOLIO:</div>
            <div style="font-size: 18px; font-weight: bold; border: 2px solid #000; padding: 6px 12px; display: inline-block;">
              ${folio}
            </div>
          </div>
        </div>

        <!-- Información básica en 2 columnas -->
        <div style="display: flex; margin-bottom: 25px; gap: 25px;">
          <div style="flex: 1;">
            <div style="margin-bottom: 20px;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">PROYECTO:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${motor.projectName || 'Mantenimiento de Motor'}
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">CLAVE:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${motor.numeroSerie}
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">CONTRATO:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${motor.projectId || 'N/A'}
              </div>
            </div>
          </div>
          <div style="flex: 1;">
            <div style="margin-bottom: 20px;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">FECHA:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${fecha}
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">CLIENTE:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${cliente}
              </div>
            </div>
            <div style="margin-bottom: 20px;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">VIGENCIA:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${motor.proximoMantenimiento || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <!-- Información de contacto -->
        <div style="margin-bottom: 25px;">
          <div style="display: flex; margin-bottom: 20px; gap: 25px;">
            <div style="flex: 1;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">RESPONSABLE:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${motor.responsableTecnico}
              </div>
            </div>
            <div style="flex: 1;">
              <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">CORREO:</label>
              <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
                ${motor.emailResponsable}
              </div>
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">TELÉFONO:</label>
            <div style="border: 2px solid #ccc; padding: 12px; font-size: 14px; min-height: 25px; background: #f9f9f9;">
              ${motor.telefonoResponsable}
            </div>
          </div>
        </div>

        <!-- Tabla de producto -->
        <div style="margin-bottom: 25px;">
          <table style="width: 100%; border-collapse: collapse; border: 2px solid #000;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="border: 2px solid #000; padding: 10px; font-size: 12px; font-weight: bold; text-align: center;">PRODUCTO</th>
                <th style="border: 2px solid #000; padding: 10px; font-size: 12px; font-weight: bold; text-align: center;">MARCA</th>
                <th style="border: 2px solid #000; padding: 10px; font-size: 12px; font-weight: bold; text-align: center;">MODELO Y No. SERIE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 2px solid #000; padding: 10px; font-size: 13px; height: 30px;">
                  Motor ${motor.tipo === 'electrico' ? 'Eléctrico' : motor.tipo === 'diesel_electrico' ? 'Diesel-Eléctrico' : 'Tracción Eléctrica'}
                </td>
                <td style="border: 2px solid #000; padding: 10px; font-size: 13px; height: 30px;">
                  ${motor.marca}
                </td>
                <td style="border: 2px solid #000; padding: 10px; font-size: 13px; height: 30px;">
                  ${motor.modelo} - ${motor.numeroSerie}
                </td>
              </tr>
              <tr>
                <td style="border: 2px solid #000; padding: 10px; font-size: 13px; height: 30px;">
                  Línea: ${motor.lineaMetro}
                </td>
                <td style="border: 2px solid #000; padding: 10px; font-size: 13px; height: 30px;">
                  Formación: ${motor.numeroFormacion}
                </td>
                <td style="border: 2px solid #000; padding: 10px; font-size: 13px; height: 30px;">
                  ${motor.potencia} - ${motor.voltaje}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Objetivos -->
        <div style="margin-bottom: 25px;">
          <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">OBJETIVOS:</label>
          <div style="border: 2px solid #ccc; padding: 12px; font-size: 13px; min-height: 45px; background: #f9f9f9;">
            ${objetivos}
          </div>
        </div>

        <!-- Descripción -->
        <div style="margin-bottom: 25px;">
          <label style="font-weight: bold; font-size: 12px; color: #666; display: block; margin-bottom: 4px;">DESCRIPCIÓN:</label>
          <div style="border: 2px solid #ccc; padding: 12px; font-size: 13px; min-height: 45px; background: #f9f9f9;">
            ${descripcion}
          </div>
        </div>

        <!-- Tabla de firmas -->
        <div style="margin-bottom: 25px;">
          <table style="width: 100%; border-collapse: collapse; border: 2px solid #000;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="border: 2px solid #000; padding: 10px; font-size: 12px; font-weight: bold; text-align: center;">ELABORÓ</th>
                <th style="border: 2px solid #000; padding: 10px; font-size: 12px; font-weight: bold; text-align: center;">REVISÓ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 2px solid #000; padding: 10px; height: 70px; vertical-align: top;">
                  <div style="font-size: 12px; margin-bottom: 8px;">NOMBRE: ${workPlanData.elaboradoPor || ''}</div>
                  <div style="font-size: 12px; margin-bottom: 8px;">FECHA:</div>
                  <div style="font-size: 12px; margin-bottom: 8px;">FIRMA:</div>
                </td>
                <td style="border: 2px solid #000; padding: 10px; height: 70px; vertical-align: top;">
                  <div style="font-size: 12px; margin-bottom: 8px;">NOMBRE: ${workPlanData.revisadoPor || ''}</div>
                  <div style="font-size: 12px; margin-bottom: 8px;">FECHA:</div>
                  <div style="font-size: 12px; margin-bottom: 8px;">FIRMA:</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #ccc; padding-top: 10px; margin-top: 20px;">
          <div style="font-size: 11px; color: #666;">Página 1 de 1</div>
          <div style="font-size: 11px; color: #666;">${version}</div>
        </div>
        <div style="text-align: center; margin-top: 8px;">
          <div style="font-size: 11px; color: #666;">
            Industrias FMD S.A. de C.V. - Todos los derechos reservados
          </div>
        </div>
      </div>
    `;
  }
}; 