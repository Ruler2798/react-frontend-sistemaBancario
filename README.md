# 🏦 Sistema Bancario - Frontend

Aplicación web moderna para la gestión de clientes, préstamos y solicitudes de préstamos en un sistema bancario. Construida con React, TypeScript, Vite y Ant Design.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Componentes Principales](#componentes-principales)
- [API Services](#api-services)
- [Rutas](#rutas)

## 🚀 Características

- ✅ **Gestión de Clientes**: Crear, editar, visualizar y eliminar clientes
- ✅ **Gestión de Préstamos**: Visualizar préstamos aprobados con detalles completos
- ✅ **Solicitudes de Préstamos**: Crear, aprobar y rechazar solicitudes
- ✅ **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- ✅ **UI Moderna**: Interfaz con Ant Design components
- ✅ **TypeScript**: Type-safe en toda la aplicación
- ✅ **Navegación**: React Router para SPA

## 🛠 Tecnologías

### Core
- **React 19.2.0** - Librería UI
- **TypeScript 5.9.3** - Lenguaje de programación
- **Vite 7.3.1** - Build tool y dev server

### UI/Styling
- **Ant Design 6.3.1** - Librería de componentes UI
- **@ant-design/icons 6.1.0** - Iconos

### Estado y Routing
- **React Router DOM 7.13.1** - Navegación y routing

### HTTP
- **Axios 1.13.5** - Cliente HTTP

### Utilidades
- **dayjs** - Manipulación de fechas (incluido con Ant Design)

### Dev Tools
- **ESLint** - Linting
- **TypeScript ESLint** - Reglas de TypeScript

## 📦 Requisitos Previos

- **Node.js**: >= 18.x
- **npm**: >= 9.x o **yarn**: >= 1.22.x
- **Backend API**: El backend debe estar corriendo (ver configuración)

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd react-frontend-sistemaBancario
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api
```

**Variables de Entorno:**
- `VITE_API_URL`: URL base del backend API

## 📜 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview del build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 📁 Estructura del Proyecto

```
react-frontend-sistemaBancario/
├── public/                     # Archivos estáticos
├── src/
│   ├── api/                   # Servicios de API
│   │   ├── api.ts            # Configuración de Axios
│   │   ├── clientService.ts  # Servicios de clientes
│   │   ├── loanService.ts    # Servicios de préstamos
│   │   └── loanRequestService.ts  # Servicios de solicitudes
│   │
│   ├── assets/               # Imágenes, iconos, etc.
│   │
│   ├── layout/               # Componentes de layout
│   │   └── MainLayout.tsx    # Layout principal con sidebar
│   │
│   ├── modules/              # Módulos de la aplicación
│   │   ├── clients/
│   │   │   ├── ClientsPage.tsx      # Página de gestión de clientes
│   │   │   └── types.ts             # Tipos de cliente
│   │   │
│   │   └── loans/
│   │       ├── LoansPage.tsx        # Página de préstamos
│   │       ├── LoanRequestPage.tsx  # Página de solicitudes
│   │       └── types.ts             # Tipos de préstamos
│   │
│   ├── pages/                # Páginas generales
│   │   └── Home.tsx
│   │
│   ├── routes/               # Configuración de rutas
│   │   └── AppRouter.tsx
│   │
│   ├── types/                # Tipos globales
│   │   └── index.ts
│   │
│   ├── App.tsx               # Componente raíz
│   ├── App.css               # Estilos globales
│   ├── main.tsx              # Punto de entrada
│   └── index.css             # Estilos base
│
├── .env                       # Variables de entorno (no en git)
├── .gitignore                # Archivos ignorados por git
├── eslint.config.js          # Configuración de ESLint
├── index.html                # HTML principal
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración de TypeScript
├── tsconfig.app.json         # Config TS para la app
├── tsconfig.node.json        # Config TS para Node
└── vite.config.ts            # Configuración de Vite
```

## 🏗 Arquitectura

### Patrón de Diseño
La aplicación sigue una arquitectura modular con separación de responsabilidades:

1. **Capa de Presentación (Components)**: Componentes React en `modules/`
2. **Capa de Servicios (API)**: Lógica de comunicación con backend en `api/`
3. **Capa de Routing**: Gestión de rutas en `routes/`
4. **Capa de Layout**: Estructura común en `layout/`

### Flujo de Datos
```
Usuario → Componente → Service (API) → Backend
                ↓
         Estado Local (useState)
                ↓
         Re-render → UI actualizada
```

## 🧩 Componentes Principales

### ClientsPage.tsx
```typescript
// Gestión completa de clientes
- Lista de clientes con tabla responsive
- Crear nuevo cliente
- Editar cliente existente
- Eliminar cliente con confirmación
- Columnas adaptativas según tamaño de pantalla
```

**Características:**
- Tabla con scroll horizontal
- Paginación con contador
- Modal para crear/editar
- Validación de formularios
- Formateo de fecha de registro

### LoansPage.tsx
```typescript
// Visualización de préstamos aprobados
- Lista de préstamos con tabla responsive
- Ver detalle de préstamo en modal
- Tags con colores para montos
- Formateo de fechas y moneda
```

**Características:**
- Tabla con columnas responsive
- Modal de detalles
- Formato de moneda (Q)
- Visualización de información del cliente

### LoanRequestPage.tsx
```typescript
// Gestión de solicitudes de préstamos
- Lista de solicitudes con estados
- Crear nueva solicitud
- Aprobar/Rechazar solicitudes
- Tags de estado con colores
```

**Características:**
- Popconfirm para acciones críticas
- Select de clientes
- Estados: PENDIENTE, APROBADA, RECHAZADA
- Botones con iconos y colores

### MainLayout.tsx
```typescript
// Layout principal con navegación
- Sidebar colapsable
- Header con breadcrumb
- Navegación entre módulos
- Tema oscuro en sidebar
```

**Características:**
- Sider responsive
- Menú de navegación
- Outlet para rutas hijas
- Tema Ant Design

## 🌐 API Services

### api.ts
Configuración base de Axios:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" }
});
```

### clientService.ts
```typescript
getClients()              // GET /clientes
createClient(data)        // POST /clientes
updateClient(id, data)    // PUT /clientes/:id
deleteClient(id)          // DELETE /clientes/:id
```

### loanService.ts
```typescript
getLoans()                // GET /prestamos
getLoan(id)               // GET /prestamos/:id
```

### loanRequestService.ts
```typescript
getLoanRequests()         // GET /solicitudes
createLoanRequest(data)   // POST /solicitudes
approveLoanRequest(id)    // PUT /solicitudes/:id/aprobar
rejectLoanRequest(id)     // PUT /solicitudes/:id/rechazar
```

## 🛣 Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Navigate → `/clients` | Redirección a clientes |
| `/clients` | ClientsPage | Gestión de clientes |
| `/prestamos` | LoansPage | Préstamos aprobados |
| `/solicitudes` | LoanRequestPage | Gestión de solicitudes |

## 🎨 Temas y Estilos

### Responsive Breakpoints
```typescript
xs: < 576px   // Móvil
sm: ≥ 576px   // Móvil grande
md: ≥ 768px   // Tablet
lg: ≥ 992px   // Desktop pequeño
xl: ≥ 1200px  // Desktop grande
```

### Colores Principales
- **Primary**: #1677ff (Ant Design Blue)
- **Success**: #52c41a (Green)
- **Warning**: #faad14 (Gold)
- **Error**: #ff4d4f (Red)

## 📝 Tipos TypeScript

### Client
```typescript
interface Client {
  id: number;
  nombre: string;
  apellido: string;
  identificacion: string;
  fechaRegistro?: string;
  correo: string;
  telefono: string;
}
```

### Loan
```typescript
interface Loan {
  id: number;
  cliente: {
    id: number;
    nombre: string;
    apellido: string;
  };
  monto: number;
  plazoMeses: number;
  tasaInteres: number;
  fechaInicio: string;
}
```

### LoanRequest
```typescript
interface LoanRequest {
  id?: number;
  cliente?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  clienteId?: number;
  montoSolicitado: number;
  plazoMeses: number;
  tasaInteres: number;
  estado?: "PENDIENTE" | "APROBADA" | "RECHAZADA";
  fechaSolicitud?: string;
}
```

## 🚀 Deployment

### Build para Producción
```bash
npm run build
```

Esto genera los archivos optimizados en `/dist`.

### Preview del Build
```bash
npm run preview
```

### Variables de Entorno en Producción
Asegúrate de configurar `VITE_API_URL` en tu plataforma de hosting.

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo LICENSE.

## 👥 Autores

- Tu Nombre - Desarrollo inicial

## 🐛 Reporte de Bugs

Para reportar bugs, por favor abre un issue en el repositorio.

## 📞 Contacto

Para preguntas o sugerencias, contacta a través del repositorio.

---

Desarrollado con ❤️ usando React + TypeScript + Vite
