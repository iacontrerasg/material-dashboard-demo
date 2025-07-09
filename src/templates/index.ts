import PDFGenerator from './PDFGenerator';
import { WorkPlanTemplate } from './WorkPlanTemplate';
import { DiagnosticReportTemplate } from './DiagnosticReportTemplate';
import { MaintenanceReportTemplate } from './MaintenanceReportTemplate';
import { PDFTemplate } from '../types';

// Registrar todos los templates
PDFGenerator.registerTemplate(WorkPlanTemplate);
PDFGenerator.registerTemplate(DiagnosticReportTemplate);
PDFGenerator.registerTemplate(MaintenanceReportTemplate);

// Exportar templates individuales
export { WorkPlanTemplate };
export { DiagnosticReportTemplate };
export { MaintenanceReportTemplate };

// Exportar utilidades
export { PDFGenerator };
export { default as pdfGenerator } from './PDFGenerator';

// Función de utilidad para obtener un template por ID
export const getTemplate = (id: string): PDFTemplate | undefined => {
  return PDFGenerator.getTemplate(id);
};

// Función de utilidad para obtener todos los templates
export const getAllTemplates = (): PDFTemplate[] => {
  return PDFGenerator.getAvailableTemplates();
};

// Función de utilidad para generar PDF directamente
export const generatePDF = async (templateId: string, data: any, options?: any): Promise<void> => {
  const template = getTemplate(templateId);
  if (!template) {
    throw new Error(`Template con ID '${templateId}' no encontrado`);
  }
  
  await PDFGenerator.generatePDF({
    template,
    data,
    ...options
  });
};

// Constantes de IDs de templates
export const TEMPLATE_IDS = {
  WORK_PLAN: 'work-plan',
  DIAGNOSTIC_REPORT: 'diagnostic-report',
  MAINTENANCE_REPORT: 'maintenance-report'
} as const; 