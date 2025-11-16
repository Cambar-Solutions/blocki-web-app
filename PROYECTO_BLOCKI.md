# 🏠 Blocki - Plataforma de Inversión Inmobiliaria Tokenizada

## 📋 Resumen del Proyecto

**Blocki** es una plataforma web que permite a los usuarios **invertir en bienes raíces tokenizados** en LATAM utilizando tecnología blockchain (Stellar). Los propietarios pueden **fraccionar sus propiedades** en tokens, y los inversionistas pueden **comprar fracciones** de estas propiedades de forma segura y transparente.

---

## 🎨 **ESTADO ACTUAL DEL PROYECTO**

### ✅ **Completado**

1. ✅ **Sistema de diseño completo** (Tailwind v4 con tema dark mode)
2. ✅ **Arquitectura de carpetas profesional**
3. ✅ **Componentes UI reutilizables** (Button, Card, Input, Badge, Avatar, ThemeToggle)
4. ✅ **Contextos de estado global** (AuthContext, PropertyContext, WalletContext, ThemeContext)
5. ✅ **Servicios de API** (authService, propertyService, stellarService)
6. ✅ **Integración con Stellar SDK** y Freighter Wallet
7. ✅ **LoginView** - Diseño premium con validaciones
8. ✅ **RegisterView** - Registro completo con validaciones en tiempo real
9. ✅ **Configuración de rutas** (React Router v7)
10. ✅ **Sistema de notificaciones** (React Hot Toast)

### 🚧 **Pendiente (Próximos pasos)**

1. 🔲 **HomeView** (Marketplace de propiedades)
   - Grid de PropertyCards
   - Filtros de búsqueda
   - Hero section con CTA
   - Infinite scroll / paginación

2. 🔲 **PropertyView** (Detalle de propiedad)
   - Galería de imágenes
   - Información completa de la propiedad
   - Panel de compra de tokens
   - Historial de transacciones
   - Documentos legales

3. 🔲 **Layout Principal**
   - Header con navegación
   - Sidebar (opcional)
   - Footer
   - Integración con ThemeToggle

4. 🔲 **CreatePropertyView** (Wizard multi-step)
   - Formulario de tokenización
   - Upload de imágenes y documentos
   - Integración con smart contracts

5. 🔲 **MyTokensView** (Portafolio del usuario)
   - Listado de tokens del usuario
   - Balance total
   - Historial de transacciones

---

## 🛠️ **Stack Tecnológico**

### Frontend
- **React 19** con Vite
- **Tailwind CSS v4** (última versión con plugin de Vite)
- **React Router v7**
- **TanStack Query** (React Query v5)
- **React Hot Toast**
- **Lucide React** (iconos)
- **Axios** (HTTP client)

### Blockchain
- **Stellar SDK v14** (@stellar/stellar-sdk)
- **Freighter Wallet** (para autenticación blockchain)
- **Soroban** (smart contracts)

### Utilidades
- **class-variance-authority** (CVA)
- **clsx** + **tailwind-merge** (cn utility)

---

## 📁 **Estructura del Proyecto**

```
blocki-web-app/
├── src/
│   ├── components/
│   │   ├── ui/                 # Componentes UI reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── auth/               # Componentes de autenticación
│   │   ├── property/           # Componentes de propiedades
│   │   └── layout/             # Layout components (Header, Footer)
│   │
│   ├── pages/                  # Páginas principales
│   │   ├── Login.jsx           ✅ COMPLETADO
│   │   ├── Register.jsx        ✅ COMPLETADO
│   │   ├── Home.jsx            🔲 PENDIENTE
│   │   ├── PropertyView.jsx    🔲 PENDIENTE
│   │   ├── CreateProperty.jsx  🔲 PENDIENTE
│   │   └── MyTokens.jsx        🔲 PENDIENTE
│   │
│   ├── contexts/               # React Contexts
│   │   ├── AuthContext.jsx     ✅ COMPLETADO
│   │   ├── PropertyContext.jsx ✅ COMPLETADO
│   │   ├── WalletContext.jsx   ✅ COMPLETADO
│   │   └── ThemeContext.jsx    ✅ COMPLETADO
│   │
│   ├── services/               # API Services
│   │   ├── api.js              ✅ COMPLETADO (axios instance)
│   │   ├── authService.js      ✅ COMPLETADO
│   │   ├── propertyService.js  ✅ COMPLETADO
│   │   └── stellarService.js   ✅ COMPLETADO
│   │
│   ├── hooks/                  # Custom Hooks
│   │   └── (custom hooks)
│   │
│   ├── utils/                  # Utilidades
│   │
│   ├── types/                  # TypeScript types (si migramos)
│   │
│   ├── config/                 # Configuraciones
│   │
│   ├── lib/
│   │   └── utils.js            # cn() utility
│   │
│   ├── App.jsx                 ✅ COMPLETADO
│   ├── main.jsx
│   └── index.css               ✅ COMPLETADO (sistema de diseño)
│
├── public/
│   └── Favicon_blocki.png
│
├── .env.example                ✅ COMPLETADO
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎨 **Sistema de Diseño**

### Paleta de Colores

**Light Mode:**
- **Primary (Blockchain Trust):** Azul vibrante `oklch(0.55 0.22 250)`
- **Secondary (Real Estate):** Verde éxito `oklch(0.65 0.20 162)`
- **Background:** `oklch(0.99 0 0)`
- **Foreground:** `oklch(0.15 0 0)`

**Dark Mode:**
- **Primary:** Azul más brillante `oklch(0.65 0.22 250)`
- **Secondary:** Verde vibrante `oklch(0.70 0.22 162)`
- **Background:** `oklch(0.12 0 0)`
- **Foreground:** `oklch(0.98 0 0)`

### Tipografía
- **Font:** Inter (Google Fonts)
- **Tamaños:**
  - H1: 3xl (36px) - Bold
  - H2: 2xl (30px) - Bold
  - Body: base (16px) - Regular
  - Small: sm (14px)

### Animaciones
- **Blob animation:** Fondos decorativos
- **FadeIn:** Transiciones suaves
- **SlideUp:** Aparición de elementos

---

## 🔐 **Autenticación y Seguridad**

### Flujo de Autenticación

1. **Login:**
   - Usuario ingresa email + password
   - Backend valida y retorna JWT token
   - Token se guarda en `localStorage` como `blocki_token`
   - Usuario redirigido a `/home`

2. **Register:**
   - Validación en tiempo real de todos los campos
   - Password strength indicator
   - Confirmación de contraseña
   - Aceptación de términos
   - Después del registro → redirigido a `/login`

3. **Protected Routes:**
   - Rutas protegidas verifican JWT token
   - Si no hay token → redirect a `/login`
   - Auto-refresh de token implementado

### Integración con Freighter Wallet

```javascript
// Conectar wallet
const { connect, publicKey } = useWallet()
await connect()

// Firmar transacción
const { signTransaction } = useWallet()
const result = await signTransaction(xdr)
```

---

## 🏗️ **Arquitectura de Datos**

### Backend Entity: Property

```typescript
{
  id: string (uuid)
  legalId: string (Registro Público ID)
  address: string
  valuation: number (USD)
  totalTokens: number
  tokenContractId: string (Stellar contract C...)
  status: PropertyStatus (PENDING | VERIFIED | TOKENIZED | ACTIVE | SUSPENDED)
  ownerAddress: string (Stellar address)

  metadata: {
    images: string[]
    description: string
    type: PropertyType (RESIDENTIAL | COMMERCIAL | LAND | INDUSTRIAL)
    area: number (m2)
    bedrooms?: number
    bathrooms?: number
    yearBuilt?: number
    amenities?: string[]
    location: {
      lat: number
      lng: number
      city: string
      state: string
      country: string
      postalCode?: string
    }
  }

  legalDocuments: Array<{
    type: string
    url: string
    uploadedAt: Date
    verified: boolean
  }>

  verifiedAt: Date
  tokenizedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

---

## 🚀 **Cómo Ejecutar el Proyecto**

### 1. **Instalar Dependencias**

```bash
cd blocki-web-app
npm install
```

### 2. **Configurar Variables de Entorno**

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones:

```
VITE_API_URL=http://localhost:3000/api
VITE_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_STELLAR_NETWORK=testnet
```

### 3. **Ejecutar en Desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 4. **Build para Producción**

```bash
npm run build
npm run preview
```

---

## 🔗 **Endpoints del Backend**

### Auth
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/validate` - Validar token JWT
- `POST /api/auth/logout` - Cerrar sesión

### Properties
- `GET /api/properties` - Obtener todas las propiedades (con filtros)
- `GET /api/properties/:id` - Obtener propiedad por ID
- `POST /api/properties` - Crear nueva propiedad
- `PUT /api/properties/:id` - Actualizar propiedad
- `DELETE /api/properties/:id` - Eliminar propiedad
- `POST /api/properties/:id/images` - Subir imágenes
- `POST /api/properties/:id/documents` - Subir documentos legales

---

## 🎯 **Próximos Pasos para Ganar el Hackathon**

### **FASE 1: Completar Funcionalidad Core** (Prioridad Alta ⭐⭐⭐)

1. **Crear HomeView**
   - Diseño marketplace impresionante
   - Grid responsive de propiedades
   - Filtros avanzados (ubicación, precio, tipo)
   - Hero section llamativa
   - Loading states con skeletons

2. **Crear PropertyView**
   - Galería de imágenes con lightbox
   - Información detallada
   - Panel de compra de tokens con calculadora
   - Documentos legales descargables
   - Historial de transacciones en blockchain
   - Mapa interactivo

3. **Implementar Layout**
   - Header fijo con navegación fluida
   - Integrar ThemeToggle
   - User dropdown menu
   - Breadcrumbs
   - Footer profesional

### **FASE 2: Interacción Blockchain** (Prioridad Alta ⭐⭐⭐)

1. **Compra de Tokens**
   - Modal de confirmación de compra
   - Integración real con Freighter
   - Firma de transacciones
   - Confirmación en blockchain
   - Feedback visual (confetti, success states)

2. **Visualización de Portfolio**
   - MyTokensView
   - Balance de tokens del usuario
   - Gráficos de rendimiento
   - Historial completo

### **FASE 3: Polish y UX** (Prioridad Media ⭐⭐)

1. **Animaciones y Transiciones**
   - Framer Motion para micro-interacciones
   - Page transitions
   - Skeleton loaders
   - Toast mejorados

2. **Responsive Design**
   - Optimización mobile
   - Tablet view
   - Touch gestures

3. **Accesibilidad**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

### **FASE 4: Features Premium** (Prioridad Baja ⭐)

1. **Dashboard de Analíticas**
   - Gráficos con Recharts
   - Métricas en tiempo real
   - ROI calculator

2. **Notificaciones en tiempo real**
   - WebSockets
   - Push notifications

3. **Compartir en redes sociales**
   - Open Graph tags
   - Share buttons

---

## 💡 **Tips para la Presentación del Hackathon**

1. **Demo Flow Perfecto:**
   - Registro → Login → Explorar Propiedades → Ver Detalle → Conectar Wallet → Comprar Tokens → Ver Portfolio

2. **Destacar Innovación:**
   - Blockchain real (no simulado)
   - UX impecable (mejor que competidores)
   - Verificación legal de propiedades
   - Fraccionalización accesible

3. **Métricas Impresionantes:**
   - "Democratizando el acceso a bienes raíces en LATAM"
   - "Inversión mínima desde $100 USD"
   - "Transparencia total con blockchain"
   - "Documentación legal verificada"

4. **Live Demo:**
   - Propiedad ya tokenizada
   - Wallet con fondos de testnet
   - Transacción en vivo
   - Explorer de Stellar abierto

---

## 🏆 **Diferenciadores Clave vs Competencia**

1. ✅ **UX de clase mundial** (inspirado en proyecto ganador)
2. ✅ **Integración real con Stellar** (no mocks)
3. ✅ **Dark mode fluido**
4. ✅ **Validaciones en tiempo real**
5. ✅ **Documentación legal incluida**
6. ✅ **Sistema de diseño consistente**
7. ✅ **Performance optimizado** (Vite + React 19)
8. ✅ **Código limpio y escalable**

---

## 📚 **Recursos y Documentación**

- [Stellar Docs](https://developers.stellar.org/)
- [Soroban Docs](https://soroban.stellar.org/docs)
- [Freighter Wallet](https://www.freighter.app/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)

---

## 🤝 **Equipo**

- **Desarrollador:** Levsek
- **Proyecto:** Blocki - Real Estate Tokenization Platform
- **Hackathon:** Stellar Buenos Aires 2025
- **Tecnología:** React + Stellar + Soroban

---

## 📝 **Notas Finales**

Este proyecto está **casi listo** para competir. Solo falta:
1. Implementar las vistas de Home y PropertyView
2. Conectar la compra real de tokens con blockchain
3. Polish final de animaciones

**¡El diseño y la arquitectura ya están a nivel de producción!** 🚀

**Diseño inspirado en:** Proyecto ganador ISIS (stellar-levsek-web-app)
**Objetivo:** Ganar el hackathon internacional de Stellar 🏆
