# Sistema de Templating PDF

Un sistema completo y reutilizable para generar documentos PDF dinámicos a partir de templates HTML.

## Características

- **Modular**: Templates organizados en archivos separados
- **Reutilizable**: Fácil de usar desde cualquier componente
- **Configurable**: Opciones personalizables para cada template
- **Tipado**: Completamente tipado con TypeScript
- **Extensible**: Fácil agregar nuevos templates

## Estructura del Sistema

```
src/templates/
├── PDFGenerator.ts           # Generador principal (Singleton)
├── WorkPlanTemplate.ts       # Template para plan de trabajo
├── DiagnosticReportTemplate.ts # Template para reporte de diagnóstico
├── MaintenanceReportTemplate.ts # Template para reporte de mantenimiento
├── index.ts                  # Exportaciones y registro de templates
└── README.md                 # Esta documentación
```

## Uso Básico

### Importar el sistema

```typescript
import { generatePDF, TEMPLATE_IDS } from '../templates';
```

### Generar un PDF

```typescript
const motor = { /* datos del motor */ };

await generatePDF(TEMPLATE_IDS.WORK_PLAN, {
  motor,
  fecha: new Date().toLocaleDateString('es-MX'),
  cliente: 'Metro de la Ciudad de México',
  folio: 'AUTO-001'
}, {
  filename: 'Plan_Trabajo_Motor.pdf',
  format: 'letter',
  orientation: 'portrait'
});
```

## Templates Disponibles

### 1. Plan de Trabajo (`work-plan`)
Genera planes de trabajo profesionales para motores.

**Datos requeridos:**
- `motor`: Objeto Motor completo
- `fecha` (opcional): Fecha del plan
- `cliente` (opcional): Nombre del cliente
- `folio` (opcional): Número de folio

**Ejemplo:**
```typescript
await generatePDF(TEMPLATE_IDS.WORK_PLAN, {
  motor: motorData,
  fecha: '15/12/2024',
  cliente: 'Metro CDMX',
  folio: 'PT-001'
});
```

### 2. Reporte de Diagnóstico (`diagnostic-report`)
Genera reportes detallados de diagnóstico con resultados de pruebas.

**Datos requeridos:**
- `motor`: Objeto Motor completo
- `diagnosticSteps`: Array de pasos de diagnóstico
- `tecnico` (opcional): Nombre del técnico
- `supervisor` (opcional): Nombre del supervisor

**Ejemplo:**
```typescript
await generatePDF(TEMPLATE_IDS.DIAGNOSTIC_REPORT, {
  motor: motorData,
  diagnosticSteps: diagnosticStepsArray,
  tecnico: 'Juan Pérez',
  supervisor: 'María García'
});
```

### 3. Reporte de Mantenimiento (`maintenance-report`)
Genera reportes completos de mantenimiento con tareas y repuestos.

**Datos requeridos:**
- `motor`: Objeto Motor completo
- `maintenanceTasks`: Array de tareas de mantenimiento
- `tipoMantenimiento` (opcional): 'preventivo' | 'correctivo' | 'predictivo'
- `repuestosUsados` (opcional): Array de repuestos utilizados

**Ejemplo:**
```typescript
await generatePDF(TEMPLATE_IDS.MAINTENANCE_REPORT, {
  motor: motorData,
  maintenanceTasks: tasksArray,
  tipoMantenimiento: 'preventivo',
  repuestosUsados: [
    { codigo: 'REP001', descripcion: 'Filtro', cantidad: 2, precio: 25.50 }
  ]
});
```

## Opciones de Configuración

### Opciones de PDF
```typescript
{
  filename: 'mi_documento.pdf',    // Nombre del archivo
  format: 'letter' | 'a4' | 'legal', // Formato del papel
  orientation: 'portrait' | 'landscape', // Orientación
  templateOptions: {
    // Opciones específicas del template
  }
}
```

### Opciones del Template
```typescript
{
  width: '216mm',                  // Ancho del contenido
  height: 'auto',                  // Alto del contenido
  scale: 1.3,                      // Escala de renderizado
  fontSize: 14,                    // Tamaño de fuente base
  fontFamily: 'Arial, sans-serif', // Familia de fuente
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
}
```

## Crear un Nuevo Template

### 1. Crear el archivo del template

```typescript
// src/templates/MiNuevoTemplate.ts
import { PDFTemplate, TemplateData, TemplateOptions } from '../types';

export interface MiNuevoTemplateData extends TemplateData {
  // Definir la estructura de datos específica
  titulo: string;
  contenido: string;
  // ... otros campos
}

export const MiNuevoTemplate: PDFTemplate = {
  id: 'mi-nuevo-template',
  name: 'Mi Nuevo Template',
  description: 'Descripción del template',
  
  generate: (data: TemplateData, options?: TemplateOptions): string => {
    const templateData = data as MiNuevoTemplateData;
    const opts = { ...defaultOptions, ...options };
    
    return `
      <div style="font-family: ${opts.fontFamily}; font-size: ${opts.fontSize}px;">
        <h1>${templateData.titulo}</h1>
        <p>${templateData.contenido}</p>
        <!-- Más HTML aquí -->
      </div>
    `;
  }
};
```

### 2. Registrar el template

```typescript
// src/templates/index.ts
import { MiNuevoTemplate } from './MiNuevoTemplate';

PDFGenerator.registerTemplate(MiNuevoTemplate);

export const TEMPLATE_IDS = {
  // ... otros templates
  MI_NUEVO_TEMPLATE: 'mi-nuevo-template'
} as const;
```

### 3. Usar el nuevo template

```typescript
await generatePDF(TEMPLATE_IDS.MI_NUEVO_TEMPLATE, {
  titulo: 'Mi Título',
  contenido: 'Mi contenido'
});
```

## Buenas Prácticas

### Estructura de Datos
- Define interfaces específicas para cada template
- Usa valores por defecto para campos opcionales
- Valida los datos antes de generar el PDF

### Estilos CSS
- Usa estilos inline para máxima compatibilidad
- Prueba con diferentes tamaños de contenido
- Considera la impresión en diferentes formatos

### Rendimiento
- Mantén los templates simples y eficientes
- Evita imágenes grandes o complejas
- Usa caché para datos que no cambian

### Mantenimiento
- Documenta cada template nuevo
- Usa nombres descriptivos para variables
- Agrupa templates relacionados en archivos separados

## Troubleshooting

### Error: Template no encontrado
```typescript
// Asegúrate de que el template esté registrado
PDFGenerator.registerTemplate(MiTemplate);
```

### PDF se ve mal
```typescript
// Ajusta las opciones del template
templateOptions: {
  scale: 1.5,    // Aumentar escala
  fontSize: 16,  // Aumentar tamaño de fuente
  margins: { top: 30, right: 30, bottom: 30, left: 30 }
}
```

### Contenido cortado
```typescript
// Ajusta el ancho y márgenes
templateOptions: {
  width: '210mm',  // Ancho A4
  margins: { top: 20, right: 15, bottom: 20, left: 15 }
}
```

## Contribuir

Para agregar nuevos templates:

1. Crea el archivo del template siguiendo la estructura
2. Define la interfaz de datos
3. Registra el template en `index.ts`
4. Agrega el ID a `TEMPLATE_IDS`
5. Documenta el uso en este README
6. Prueba con diferentes datos de entrada

## API Reference

### PDFGenerator
- `registerTemplate(template: PDFTemplate)`: Registra un template
- `getTemplate(id: string)`: Obtiene un template por ID
- `getAvailableTemplates()`: Lista todos los templates
- `generatePDF(options: PDFGenerationOptions)`: Genera un PDF

### Funciones de Utilidad
- `generatePDF(templateId, data, options)`: Genera PDF directamente
- `getTemplate(id)`: Obtiene template por ID
- `getAllTemplates()`: Lista todos los templates disponibles 