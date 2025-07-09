import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFGenerationOptions, PDFTemplate } from '../types';

export class PDFGenerator {
  private static instance: PDFGenerator;
  private templates: Map<string, PDFTemplate> = new Map();

  private constructor() {}

  public static getInstance(): PDFGenerator {
    if (!PDFGenerator.instance) {
      PDFGenerator.instance = new PDFGenerator();
    }
    return PDFGenerator.instance;
  }

  public registerTemplate(template: PDFTemplate): void {
    this.templates.set(template.id, template);
  }

  public getTemplate(id: string): PDFTemplate | undefined {
    return this.templates.get(id);
  }

  public getAvailableTemplates(): PDFTemplate[] {
    return Array.from(this.templates.values());
  }

  public async generatePDF(options: PDFGenerationOptions): Promise<void> {
    const {
      template,
      data,
      filename = 'documento.pdf',
      format = 'letter',
      orientation = 'portrait',
      templateOptions = {}
    } = options;

    // Opciones por defecto
    const defaultOptions = {
      width: '216mm',
      height: 'auto',
      scale: 1.3,
      fontSize: 15,
      fontFamily: 'Arial, sans-serif',
      margins: { top: 25, right: 25, bottom: 25, left: 25 }
    };

    const mergedOptions = { ...defaultOptions, ...templateOptions };

    try {
      // Generar HTML del template
      const htmlContent = template.generate(data, mergedOptions);

      // Crear elemento temporal
      const tempDiv = document.createElement('div');
      tempDiv.id = 'pdf-template-temp';
      tempDiv.style.width = mergedOptions.width;
      tempDiv.innerHTML = htmlContent;

      // Añadir al DOM
      document.body.appendChild(tempDiv);

      // Convertir a canvas
      const canvas = await html2canvas(tempDiv, {
        scale: mergedOptions.scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempDiv.scrollWidth,
        height: tempDiv.scrollHeight
      });

      // Crear PDF
      const pdf = new jsPDF(orientation, 'mm', format);
      const imgData = canvas.toDataURL('image/png');
      
      // Dimensiones según formato
      const formatDimensions = this.getFormatDimensions(format);
      const pdfWidth = orientation === 'portrait' ? formatDimensions.width : formatDimensions.height;
      const pdfHeight = orientation === 'portrait' ? formatDimensions.height : formatDimensions.width;
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Añadir imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pdfHeight));

      // Descargar PDF
      pdf.save(filename);
      
      // Limpiar
      document.body.removeChild(tempDiv);
      
      console.log(`PDF generado exitosamente: ${filename}`);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      
      // Limpiar en caso de error
      const tempDiv = document.getElementById('pdf-template-temp');
      if (tempDiv) {
        document.body.removeChild(tempDiv);
      }
      
      throw new Error('Error al generar el PDF');
    }
  }

  private getFormatDimensions(format: 'letter' | 'a4' | 'legal'): { width: number; height: number } {
    switch (format) {
      case 'letter':
        return { width: 216, height: 279 };
      case 'a4':
        return { width: 210, height: 297 };
      case 'legal':
        return { width: 216, height: 356 };
      default:
        return { width: 216, height: 279 };
    }
  }
}

export default PDFGenerator.getInstance(); 