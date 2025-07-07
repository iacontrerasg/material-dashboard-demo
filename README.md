# Sistema de Gestión de Contratos

Un sistema moderno de gestión de contratos desarrollado con React, TypeScript y Material-UI.

## 🚀 Características

- **Autenticación**: Sistema de login seguro con credenciales de prueba
- **Dashboard Interactivo**: Resumen visual con estadísticas y métricas
- **Gestión de Contratos**: Crear, editar, eliminar y visualizar contratos
- **Interfaz Moderna**: Diseño limpio y responsive con Material-UI
- **Navegación Intuitiva**: Sidebar navegable con diferentes secciones
- **Búsqueda y Filtros**: Funcionalidad de búsqueda y filtrado de contratos

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Material-UI (MUI)** - Biblioteca de componentes React
- **React Router** - Enrutamiento para aplicaciones React
- **Emotion** - Biblioteca CSS-in-JS para estilos

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🔧 Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd sistema-contratos
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Abre tu navegador y visita `http://localhost:3000`

## 🔑 Credenciales de Prueba

Para acceder al sistema, usa las siguientes credenciales:

- **Email**: `admin@empresa.com`
- **Contraseña**: `admin123`

## 📱 Funcionalidades Principales

### 1. Dashboard Principal
- Estadísticas generales del sistema
- Contratos recientes
- Métricas de progreso
- Resumen rápido de actividades

### 2. Módulo de Contratos
- **Crear contratos**: Formulario completo con validación
- **Editar contratos**: Modificar información existente
- **Eliminar contratos**: Eliminar contratos no deseados
- **Buscar contratos**: Filtrar por cliente o servicio
- **Filtrar por estado**: Pendiente, Activo, Completado, Cancelado

### 3. Campos del Contrato
- Nombre del cliente
- Email del cliente
- Teléfono del cliente
- Nombre del servicio
- Descripción del servicio
- Monto del contrato
- Fecha de inicio
- Fecha de fin
- Estado del contrato

## 🎨 Diseño y UX

- **Diseño Responsive**: Funciona en desktop, tablet y móvil
- **Colores Modernos**: Paleta de colores profesional con gradientes
- **Tipografía**: Fuentes legibles y jerarquía visual clara
- **Iconografía**: Iconos Material Design para mejor UX
- **Animaciones**: Transiciones suaves y efectos hover

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Login.tsx                 # Componente de autenticación
│   ├── Dashboard.tsx             # Layout principal con navegación
│   ├── DashboardHome.tsx         # Página principal del dashboard
│   └── ContractModule.tsx        # Módulo de gestión de contratos
├── contexts/
│   └── AuthContext.tsx           # Context de autenticación
├── types/
│   └── index.ts                  # Definiciones TypeScript
└── App.tsx                       # Componente principal
```

## 🔒 Seguridad

- Autenticación basada en contexto React
- Persistencia de sesión con localStorage
- Validación de formularios
- Protección de rutas

## 📊 Estados de Contrato

- **Pendiente**: Contrato creado pero no iniciado
- **Activo**: Contrato en progreso
- **Completado**: Contrato finalizado exitosamente
- **Cancelado**: Contrato cancelado o terminado prematuramente

## 🚧 Próximas Funcionalidades

- Módulo de gestión de clientes
- Sistema de reportes y análisis
- Exportación de datos (PDF, Excel)
- Notificaciones push
- Integración con APIs externas
- Sistema de roles y permisos

## 📈 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expulsa la configuración de Create React App

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🐛 Reportar Problemas

Si encuentras algún error o tienes una sugerencia, por favor abre un [issue](https://github.com/usuario/sistema-contratos/issues).

## 📞 Contacto

Para más información o consultas, contacta a:
- **Email**: contacto@empresa.com
- **Teléfono**: +52 555 123 4567

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella!

## 🎯 Capturas de Pantalla

### Login
![Login](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Módulo de Contratos
![Contratos](screenshots/contratos.png)

---

**Desarrollado con ❤️ utilizando React y Material-UI**
