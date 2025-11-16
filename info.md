# Blocki - Especificación de Frontend (React)
## Documentación de Arquitectura para Desarrollo de Interfaces

---

## 📊 Información de los Diagramas C4

### LEVEL 3: COMPONENTES FRONTEND (React MVC)

El diagrama muestra la arquitectura del frontend dividida en 3 capas principales:

#### 1. VIEWS (Vistas - Páginas principales)

**LoginView**
- Página de inicio de sesión
- Contiene formulario de login
- Redirección a RegisterView si no tiene cuenta
- Redirección a HomeView después del login exitoso

**RegisterView**
- Página de registro de nuevos usuarios
- Formulario completo de registro
- Validación de datos
- Creación de cuenta nueva

**HomeView**
- Dashboard principal después del login
- Vista general de propiedades disponibles
- Permite navegar a PropertyView al seleccionar una propiedad

**PropertyView**
- Vista detallada de una propiedad específica
- Información completa de la propiedad
- Opciones de tokenización
- Información de tokens disponibles
- Opción de compra de tokens

#### 2. CONTROLLERS (Hooks - Lógica de negocio en React)

**useAuth**
- Hook personalizado para gestión de autenticación
- Funciones: login, register, logout
- Estado: usuario actual, isAuthenticated
- Conexión con authService

**useProperty**
- Hook para gestión de propiedades
- Funciones: obtener propiedades, crear, editar
- Estado: lista de propiedades, propiedad seleccionada
- Conexión con propertyService

**useToken**
- Hook para gestión de tokens blockchain
- Funciones: comprar tokens, obtener balance
- Estado: tokens del usuario
- Conexión con tokenService

#### 3. SERVICES (Capa de servicios - Llamadas API)

**authService**
- Servicio para comunicación con API de autenticación
- Endpoints: POST /login, POST /register, GET /profile
- Manejo de JWT tokens
- Persistencia de sesión

**propertyService**
- Servicio para operaciones CRUD de propiedades
- Endpoints: GET /properties, GET /properties/:id, POST /properties
- Filtrado y búsqueda
- Upload de documentos

**tokenService**
- Servicio para operaciones de tokenización
- Interacción con Stellar blockchain
- Endpoints: POST /tokens/issue, POST /tokens/purchase
- Manejo de transacciones blockchain

---

## 🎨 ESPECIFICACIÓN DETALLADA DE CADA VISTA

### 1. LoginView

**Propósito**: Página de autenticación de usuarios existentes

**Componentes visuales principales**:
```
┌─────────────────────────────────────────────┐
│              BLOCKI LOGO                     │
│                                              │
│      ┌───────────────────────────────┐     │
│      │  Email                        │     │
│      │  [_____________________]      │     │
│      │                               │     │
│      │  Contraseña                   │     │
│      │  [_____________________]      │     │
│      │                               │     │
│      │  [Olvidé mi contraseña]       │     │
│      │                               │     │
│      │     [  INICIAR SESIÓN  ]      │     │
│      │                               │     │
│      │  ¿No tienes cuenta?           │     │
│      │  [Regístrate aquí]            │     │
│      └───────────────────────────────┘     │
│                                              │
└─────────────────────────────────────────────┘
```

**Elementos de la interfaz**:
- Logo de Blocki (centrado, parte superior)
- Card/Container central con fondo blanco
- Input Email (tipo email, validación required)
- Input Password (tipo password, toggle mostrar/ocultar)
- Link "Olvidé mi contraseña"
- Botón primario "INICIAR SESIÓN" (full width)
- Texto + Link "¿No tienes cuenta? Regístrate aquí"
- Mensajes de error (toast o alert) para credenciales incorrectas

**Estados de interacción**:
- Estado inicial: formulario vacío
- Estado loading: botón deshabilitado con spinner mientras autentica
- Estado error: mensaje de error visible
- Estado success: redirección automática a HomeView

**Flujo**:
1. Usuario ingresa email y password
2. Click en "Iniciar sesión"
3. useAuth.login() se ejecuta
4. authService hace POST a /api/auth/login
5. Si exitoso: guarda token JWT y redirecciona a /home
6. Si falla: muestra mensaje de error

---

### 2. RegisterView

**Propósito**: Registro de nuevos usuarios (propietarios o inversionistas)

**Componentes visuales principales**:
```
┌─────────────────────────────────────────────────────┐
│              BLOCKI - REGISTRO                       │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  Tipo de usuario                           │    │
│  │  ( ) Propietario  ( ) Inversionista        │    │
│  │                                             │    │
│  │  Nombre completo                           │    │
│  │  [_______________________________]         │    │
│  │                                             │    │
│  │  Email                                      │    │
│  │  [_______________________________]         │    │
│  │                                             │    │
│  │  Teléfono                                   │    │
│  │  [_______________________________]         │    │
│  │                                             │    │
│  │  Contraseña                                 │    │
│  │  [_______________________________]         │    │
│  │  - Mínimo 8 caracteres                     │    │
│  │  - Al menos 1 mayúscula                    │    │
│  │  - Al menos 1 número                       │    │
│  │                                             │    │
│  │  Confirmar contraseña                      │    │
│  │  [_______________________________]         │    │
│  │                                             │    │
│  │  [✓] Acepto términos y condiciones        │    │
│  │                                             │    │
│  │         [  CREAR CUENTA  ]                 │    │
│  │                                             │    │
│  │  ¿Ya tienes cuenta? [Inicia sesión]       │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Elementos de la interfaz**:
- Radio buttons para seleccionar tipo de usuario
- Input Nombre completo (text, required)
- Input Email (email, required, validación de formato)
- Input Teléfono (tel, formato internacional)
- Input Password (password, con validaciones en vivo)
  - Indicador de fortaleza de contraseña (débil/media/fuerte)
  - Lista de requisitos con checkmarks
- Input Confirmar password (debe coincidir)
- Checkbox Términos y condiciones (required, con modal de T&C)
- Botón "CREAR CUENTA" (full width, deshabilitado hasta que todo sea válido)
- Link a LoginView

**Validaciones en tiempo real**:
- Email: formato válido
- Password: requisitos de seguridad
- Confirmar password: debe coincidir
- Teléfono: formato válido
- Checkbox T&C: debe estar marcado

**Flujo**:
1. Usuario selecciona tipo (Propietario/Inversionista)
2. Completa formulario con validación en tiempo real
3. Acepta términos y condiciones
4. Click en "Crear cuenta"
5. useAuth.register() se ejecuta
6. authService hace POST a /api/auth/register
7. Si exitoso: auto-login y redirecciona a /home con mensaje de bienvenida
8. Si falla: muestra errores específicos (email ya existe, etc.)

---

### 3. HomeView (Dashboard Principal)

**Propósito**: Vista principal después del login, muestra propiedades disponibles

**Componentes visuales principales**:
```
┌──────────────────────────────────────────────────────────────┐
│  [BLOCKI]    Propiedades  Mis Tokens  Perfil    [👤 Usuario] │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║           TOKENIZA TU PROPIEDAD                        ║  │
│  ║  Convierte el equity de tu inmueble en liquidez       ║  │
│  ║                  [EMPEZAR AHORA]                       ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🔍 Buscar propiedades...                            │    │
│  │                                                      │    │
│  │ 📍 Ubicación: [Todas ▼]  💰 Precio: [$-$$$]        │    │
│  │ 🏠 Tipo: [Todos ▼]       📊 Estado: [Todos ▼]      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  Propiedades Destacadas (12 resultados)                     │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│  │   ┌──────┐  │   ┌──────┐  │   ┌──────┐  │   ┌──────┐  │ │
│  │   │ IMG  │  │   │ IMG  │  │   │ IMG  │  │   │ IMG  │  │ │
│  │   └──────┘  │   └──────┘  │   └──────┘  │   └──────┘  │ │
│  │  Casa en    │  Depto en   │  Local en   │  Casa en    │ │
│  │  Polanco    │  Condesa    │  Roma       │  Coyoacán   │ │
│  │  $2.5M MXN  │  $1.8M MXN  │  $3.2M MXN  │  $4.1M MXN  │ │
│  │  📍 CDMX    │  📍 CDMX    │  📍 CDMX    │  📍 CDMX    │ │
│  │  🪙 65% tok │  🪙 40% tok │  🪙 80% tok │  🪙 30% tok │ │
│  │  [VER MÁS]  │  [VER MÁS]  │  [VER MÁS]  │  [VER MÁS]  │ │
│  └─────────────┴─────────────┴─────────────┴─────────────┘ │
│                                                               │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│  │  [Segunda fila de 4 propiedades más...]               │ │
│  └─────────────┴─────────────┴─────────────┴─────────────┘ │
│                                                               │
│            [Cargar más propiedades]                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**Elementos de la interfaz**:

**Header/Navigation**:
- Logo Blocki (esquina superior izquierda)
- Menú: Propiedades | Mis Tokens | Perfil
- Avatar + nombre usuario (esquina superior derecha)
- Dropdown: Mi perfil, Mis propiedades, Cerrar sesión

**Hero Section**:
- Banner llamativo con CTA principal
- Título: "Tokeniza tu propiedad"
- Subtítulo explicativo
- Botón principal: "EMPEZAR AHORA" → redirecciona a formulario de tokenización

**Filtros de búsqueda**:
- Barra de búsqueda (texto libre)
- Filtro Ubicación (dropdown: CDMX, Guadalajara, Monterrey, etc.)
- Filtro Precio (slider o rangos: $-$$-$$$-$$$$)
- Filtro Tipo (dropdown: Casa, Departamento, Local, Terreno)
- Filtro Estado de tokenización (dropdown: Todos, En proceso, Disponible, Agotado)
- Botón "Aplicar filtros" / "Limpiar filtros"

**Grid de Propiedades**:
- Layout: Grid responsive (4 columnas en desktop, 2 en tablet, 1 en mobile)
- Cada PropertyCard contiene:
  - Imagen principal de la propiedad
  - Título/nombre de la propiedad
  - Precio total de la propiedad
  - Ubicación (ícono + ciudad)
  - Porcentaje tokenizado (barra de progreso visual)
  - Número de tokens disponibles
  - Botón "VER MÁS" → redirecciona a PropertyView

**Paginación**:
- Botón "Cargar más" (infinite scroll)
- O paginación clásica: [< 1 2 3 ... 10 >]

**Estados**:
- Loading: Skeleton cards mientras carga
- Empty: "No se encontraron propiedades" con sugerencias
- Error: Mensaje de error con botón "Reintentar"

**Flujo**:
1. Usuario llega después del login
2. useProperty.fetchProperties() se ejecuta automáticamente
3. Se muestran propiedades en el grid
4. Usuario puede filtrar/buscar
5. Click en "VER MÁS" de una propiedad → navega a PropertyView con el ID

---

### 4. PropertyView (Detalle de Propiedad)

**Propósito**: Vista completa de una propiedad específica con opción de comprar tokens

**Componentes visuales principales**:
```
┌──────────────────────────────────────────────────────────────────┐
│  [← Volver]           BLOCKI                      [👤 Usuario]   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────┐  ┌──────────────────────────────┐   │
│  │                        │  │  Casa en Polanco              │   │
│  │     GALERÍA DE         │  │  📍 Av. Presidente Masaryk   │   │
│  │     IMÁGENES           │  │  CDMX, México                │   │
│  │    [Imagen principal]  │  │                               │   │
│  │                        │  │  Propietario: Juan Pérez     │   │
│  │  [img][img][img][img]  │  │  🏠 Residencial              │   │
│  │  Thumbnails carousel   │  │  📐 250 m²                   │   │
│  │                        │  │  🛏️ 4 recámaras | 3 baños   │   │
│  └────────────────────────┘  │  🅿️ 2 estacionamientos      │   │
│                               │                               │   │
│  ┌─────────────────────────┐ │  Valor total: $2,500,000 MXN │   │
│  │ DESCRIPCIÓN             │ │                               │   │
│  │ Hermosa casa ubicada... │ │  ┌─────────────────────────┐ │   │
│  │ con acabados de lujo... │ │  │ INFORMACIÓN DE TOKENS   │ │   │
│  │                         │ │  ├─────────────────────────┤ │   │
│  │ Características:        │ │  │ Total emitido: 1000 tkn │ │   │
│  │ • Cocina integral       │ │  │ Disponibles: 650 tokens │ │   │
│  │ • Jardín privado        │ │  │ Precio/token: $2,500MXN │ │   │
│  │ • Sistema seguridad     │ │  │                         │ │   │
│  └─────────────────────────┘ │  │ Progreso tokenización   │ │   │
│                               │  │ [███████░░] 65%         │ │   │
│  ┌─────────────────────────┐ │  │                         │ │   │
│  │ 📄 DOCUMENTOS LEGALES   │ │  │ Retorno estimado: 8% ap │ │   │
│  │ • Escritura pública ✓   │ │  └─────────────────────────┘ │   │
│  │ • Certificado predial ✓ │ │                               │   │
│  │ • Avalúo actualizado ✓  │ │  ┌─────────────────────────┐ │   │
│  │ • No gravamen ✓         │ │  │  Comprar Tokens         │ │   │
│  │ [Descargar todos]       │ │  ├─────────────────────────┤ │   │
│  └─────────────────────────┘ │  │ Cantidad: [____] tokens │ │   │
│                               │  │                         │ │   │
│  ┌─────────────────────────┐ │  │ Total: $_____ MXN      │ │   │
│  │ 📍 UBICACIÓN (MAPA)     │ │  │                         │ │   │
│  │  [Google Maps iframe]   │ │  │   [COMPRAR TOKENS]     │ │   │
│  └─────────────────────────┘ │  └─────────────────────────┘ │   │
│                               │                               │   │
│  ┌──────────────────────────────────────────────────────┐   │   │
│  │ 📊 HISTORIAL DE TRANSACCIONES                         │   │   │
│  ├──────────────────────────────────────────────────────┤   │   │
│  │ Fecha       | Usuario    | Tokens | Monto    | Hash  │   │   │
│  │ 10/11/2025  | María G.   | 50 tkn | $125k   | 0xf3..│   │   │
│  │ 08/11/2025  | Carlos R.  | 100tkn | $250k   | 0xa2..│   │   │
│  │ 05/11/2025  | Ana M.     | 200tkn | $500k   | 0x7b..│   │   │
│  └──────────────────────────────────────────────────────┘   │   │
│                                                               │   │
└──────────────────────────────────────────────────────────────────┘
```

**Elementos de la interfaz**:

**Header de navegación**:
- Botón "← Volver" (regresa a HomeView)
- Breadcrumb: Home > Propiedades > Casa en Polanco

**Sección izquierda - Información de propiedad**:

1. **Galería de imágenes**:
   - Imagen principal (grande, ocupando 60% del ancho)
   - Carousel de thumbnails abajo
   - Botón "Ver galería completa" abre modal/lightbox
   - Indicador de imagen actual (1/12)

2. **Descripción**:
   - Card con título "Descripción"
   - Texto completo de la propiedad
   - Lista de características destacadas
   - Amenidades incluidas

3. **Documentos legales**:
   - Card con listado de documentos
   - Checkmarks en documentos verificados
   - Iconos de PDF para cada documento
   - Botón "Descargar todos" (ZIP)
   - Botón individual "Ver" para cada documento

4. **Mapa de ubicación**:
   - Iframe de Google Maps
   - Pin en la ubicación exacta
   - Información de zona (escuelas, hospitales cercanos)

**Sección derecha - Panel de tokenización**:

1. **Información básica**:
   - Título de la propiedad
   - Dirección completa
   - Nombre del propietario (con avatar)
   - Características principales (íconos + texto)
   - Valor total de la propiedad

2. **Card de información de tokens**:
   - Total de tokens emitidos
   - Tokens disponibles
   - Precio por token
   - Barra de progreso visual de tokenización
   - Porcentaje tokenizado
   - ROI estimado anual

3. **Card de compra de tokens**:
   - Input numérico para cantidad de tokens
   - Validación: mínimo 1, máximo disponibles
   - Calculadora en vivo del total en MXN
   - Breakdown: Tokens × Precio = Total + Fee
   - Botón primario "COMPRAR TOKENS"
   - Disclaimer: "Conecta tu wallet Stellar"

**Sección inferior - Historial**:
- Tabla completa de transacciones
- Columnas: Fecha | Comprador | Tokens | Monto | Hash blockchain
- Link a explorador de Stellar en cada hash
- Paginación si hay muchas transacciones
- Filtros por fecha, monto

**Modales/Interacciones**:

**Modal de compra**:
Cuando se hace click en "COMPRAR TOKENS":
```
┌──────────────────────────────────┐
│  Confirmar compra de tokens      │
├──────────────────────────────────┤
│                                   │
│  Propiedad: Casa en Polanco      │
│  Cantidad: 50 tokens              │
│  Precio/token: $2,500 MXN        │
│  ─────────────────────────────── │
│  Subtotal: $125,000 MXN          │
│  Fee plataforma (2%): $2,500     │
│  ─────────────────────────────── │
│  TOTAL: $127,500 MXN             │
│                                   │
│  Wallet Stellar:                 │
│  [Conectar Freighter Wallet]     │
│                                   │
│  [CANCELAR]  [CONFIRMAR COMPRA]  │
└──────────────────────────────────┘
```

**Flujo de compra**:
1. Usuario ingresa cantidad de tokens
2. Se calcula total automáticamente
3. Click en "COMPRAR TOKENS"
4. Se abre modal de confirmación
5. Usuario conecta wallet Freighter
6. Confirma transacción en Freighter
7. useToken.purchaseToken() se ejecuta
8. tokenService hace POST a /api/tokens/purchase
9. Se ejecuta smart contract en Soroban
10. Si exitoso: muestra mensaje success + actualiza balance
11. Se actualiza historial de transacciones

**Estados de interacción**:
- Loading: Skeleton mientras carga la propiedad
- Error 404: "Propiedad no encontrada"
- Sin tokens disponibles: Botón deshabilitado + mensaje
- Compra en proceso: Spinner en botón
- Compra exitosa: Toast verde + confetti animation

---

## 🔄 FLUJOS DE USUARIO COMPLETOS

### FLUJO 1: Usuario nuevo se registra e invierte

```
1. Usuario llega a la landing page
   └─> Click en "Registrarse"
   
2. RegisterView
   ├─> Selecciona "Inversionista"
   ├─> Completa formulario
   ├─> Acepta términos
   └─> Click "Crear cuenta"
       └─> useAuth.register()
           └─> authService.register()
               ├─> Success: auto-login
               └─> Error: muestra mensaje

3. Redirección a HomeView (primer login)
   ├─> Mensaje de bienvenida
   └─> Tutorial opcional (tooltips)

4. HomeView
   ├─> Ve grid de propiedades
   ├─> Usa filtros para buscar
   └─> Click en PropertyCard que le interesa

5. PropertyView
   ├─> Revisa información de la propiedad
   ├─> Ve documentos legales
   ├─> Revisa historial de transacciones
   ├─> Decide cantidad de tokens
   └─> Click "COMPRAR TOKENS"

6. Modal de confirmación
   ├─> Revisa resumen de compra
   ├─> Conecta Freighter Wallet
   └─> Confirma transacción
       └─> useToken.purchaseToken()
           └─> tokenService.purchaseTokens()
               └─> Interacción con Soroban smart contract
                   ├─> Success: tokens transferidos
                   └─> Error: muestra mensaje + rollback

7. Confirmación de compra
   ├─> Toast de éxito
   ├─> Email de confirmación
   ├─> Puede ver sus tokens en "Mis Tokens"
   └─> Historial actualizado en PropertyView
```

### FLUJO 2: Propietario tokeniza su propiedad

```
1. LoginView
   └─> Usuario propietario inicia sesión

2. HomeView
   └─> Click en "TOKENIZA TU PROPIEDAD" (Hero CTA)

3. CreatePropertyView (Nueva vista - formulario)
   ├─> Paso 1: Información básica
   │   ├─> Título de la propiedad
   │   ├─> Dirección completa
   │   ├─> Tipo (Casa/Depto/Local/Terreno)
   │   ├─> Dimensiones (m²)
   │   ├─> Características (recámaras, baños, etc.)
   │   └─> Click "Siguiente"
   │
   ├─> Paso 2: Descripción y media
   │   ├─> Descripción detallada (editor de texto)
   │   ├─> Upload de imágenes (drag & drop)
   │   ├─> Imagen principal destacada
   │   └─> Click "Siguiente"
   │
   ├─> Paso 3: Documentación legal
   │   ├─> Upload escritura pública
   │   ├─> Upload certificado predial
   │   ├─> Upload avalúo actualizado
   │   ├─> Upload certificado de no gravamen
   │   └─> Click "Siguiente"
   │
   ├─> Paso 4: Tokenización
   │   ├─> Valor total de la propiedad
   │   ├─> Porcentaje a tokenizar (slider 10%-100%)
   │   ├─> Número de tokens a emitir
   │   ├─> Precio por token (calculado automáticamente)
   │   ├─> ROI estimado anual
   │   └─> Click "Siguiente"
   │
   └─> Paso 5: Verificación
       ├─> Resumen completo
       ├─> Acepta términos específicos de tokenización
       ├─> Verificación biométrica (integración API)
       ├─> Certificación notarial (upload)
       └─> Click "PUBLICAR PROPIEDAD"
           └─> useProperty.createProperty()
               └─> propertyService.create()
                   └─> Crea propiedad en DB
                       └─> useToken.issueToken()
                           └─> tokenService.issueToken()
                               └─> Ejecuta smart contract PropertyToken
                                   └─> Emite tokens en Stellar
                                       ├─> Success: propiedad publicada
                                       └─> Error: muestra mensaje

4. Confirmación
   ├─> Mensaje de éxito
   ├─> Vista previa de la propiedad publicada
   └─> Redirección a PropertyView de su propiedad
```

### FLUJO 3: Usuario consulta sus tokens

```
1. Desde cualquier vista
   └─> Click en "Mis Tokens" en el menú

2. MyTokensView (Nueva vista)
   ├─> Header con balance total en tokens
   ├─> Balance total en MXN
   ├─> Grid de PropertyCards de propiedades donde tiene tokens
   │   └─> Cada card muestra:
   │       ├─> Imagen de la propiedad
   │       ├─> Nombre
   │       ├─> Cantidad de tokens que posee
   │       ├─> Valor actual
   │       ├─> Ganancia/pérdida (%)
   │       └─> Botón "Ver detalles"
   │
   └─> Tabla de transacciones históricas del usuario
       └─> Filtros por fecha, propiedad, tipo (compra/venta)

3. Click en "Ver detalles" de una propiedad
   └─> Redirección a PropertyView con tab especial "Mis Tokens"
       ├─> Información de su inversión
       ├─> Rendimientos históricos
       ├─> Opción de vender tokens (marketplace)
       └─> Historial de dividendos
```

---

## 🎨 SISTEMA DE DISEÑO Y ESPECIFICACIONES UX

### Paleta de colores sugerida

```
Primary (Blockchain/Trust):
- Primary: #2563EB (Azul vibrante)
- Primary Dark: #1E40AF
- Primary Light: #60A5FA

Secondary (Real Estate):
- Secondary: #10B981 (Verde éxito)
- Secondary Dark: #059669
- Secondary Light: #34D399

Neutrals:
- Background: #F9FAFB
- Surface: #FFFFFF
- Border: #E5E7EB
- Text Primary: #111827
- Text Secondary: #6B7280

Status:
- Success: #10B981
- Error: #EF4444
- Warning: #F59E0B
- Info: #3B82F6
```

### Tipografía

```
Font Family: Inter / Poppins / Work Sans

Headings:
- H1: 36px / 600 weight / -0.02em tracking
- H2: 30px / 600 weight / -0.01em tracking
- H3: 24px / 600 weight / 0em tracking
- H4: 20px / 500 weight

Body:
- Large: 18px / 400 weight / 1.6 line-height
- Base: 16px / 400 weight / 1.5 line-height
- Small: 14px / 400 weight / 1.4 line-height
- Tiny: 12px / 400 weight / 1.3 line-height
```

### Espaciado (Tailwind scale)

```
- 2xs: 4px  (p-1)
- xs:  8px  (p-2)
- sm:  12px (p-3)
- md:  16px (p-4)
- lg:  24px (p-6)
- xl:  32px (p-8)
- 2xl: 48px (p-12)
- 3xl: 64px (p-16)
```

### Componentes UI base (shadcn/ui)

**Usar estos componentes de shadcn/ui**:
- Button (variants: default, destructive, outline, ghost, link)
- Card (Card, CardHeader, CardTitle, CardContent, CardFooter)
- Input
- Label
- Select (Dropdown)
- Checkbox
- RadioGroup
- Slider
- Badge
- Alert
- Dialog (Modal)
- Toast (Notificaciones)
- Skeleton (Loading states)
- Tabs
- Avatar
- Progress (Barras de progreso)

### Principios de UX

**1. Claridad sobre cleverness**
- Textos claros y directos
- Call-to-actions obvios
- No usar jerga técnica blockchain sin explicar

**2. Progressive disclosure**
- Mostrar información básica primero
- Detalles técnicos en tabs/accordions
- Tooltips para términos complejos

**3. Feedback constante**
- Loading states en todas las acciones
- Mensajes de éxito/error claros
- Confirmaciones antes de acciones importantes

**4. Mobile-first pero desktop-optimized**
- Diseño responsive desde mobile
- Aprovechar espacio en desktop
- Touch targets de mínimo 44px

**5. Confianza y seguridad**
- Mostrar verificaciones visualmente
- Badges de "Verificado"
- Información legal visible
- Transparencia en fees

### Interacciones y micro-animaciones

**Transiciones suaves**:
- Hover states: 150ms ease-in-out
- Page transitions: 300ms ease
- Modal appearances: 200ms ease-out

**Animaciones de éxito**:
- Confetti al comprar tokens exitosamente
- Checkmark animado en verificaciones
- Progress bars animadas

**Loading states**:
- Skeleton screens (preferido sobre spinners)
- Shimmer effect en cards
- Progress bar en uploads de archivos

### Responsive breakpoints

```
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide: > 1280px
```

---

## 🔌 CONEXIONES E INTEGRACIONES

### Conexión Frontend → Backend

Todos los services usan Axios con configuración base:

```typescript
// src/config/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Intentar refresh token
      // Si falla, logout
    }
    return Promise.reject(error);
  }
);
```

### Integración con Stellar/Soroban

```typescript
// src/utils/stellar.ts
import { Server, Keypair, Networks, TransactionBuilder } from '@stellar/stellar-sdk';

const server = new Server('https://horizon-testnet.stellar.org');

export const stellarClient = {
  // Conectar wallet
  connectWallet: async () => {
    // Integración con Freighter
  },
  
  // Comprar tokens
  purchaseTokens: async (assetCode, amount) => {
    // Construir transacción
    // Firmar con Freighter
    // Enviar a Stellar
  },
  
  // Consultar balance
  getBalance: async (publicKey) => {
    // Consultar cuenta en Stellar
  }
};
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Autenticación (Week 1)
- [ ] LoginView con formulario
- [ ] RegisterView con validaciones
- [ ] useAuth hook
- [ ] authService con API calls
- [ ] Persistencia de JWT
- [ ] Protected routes
- [ ] Logout functionality

### Fase 2: Dashboard (Week 2)
- [ ] HomeView layout
- [ ] PropertyCard component
- [ ] PropertyList component
- [ ] Filtros de búsqueda
- [ ] useProperty hook
- [ ] propertyService
- [ ] Infinite scroll / Paginación
- [ ] Loading states

### Fase 3: Detalle de Propiedad (Week 3)
- [ ] PropertyView layout
- [ ] Image gallery
- [ ] Property information cards
- [ ] Documents section
- [ ] Map integration
- [ ] Token information panel
- [ ] Purchase form
- [ ] Transaction history table

### Fase 4: Tokenización (Week 4)
- [ ] CreatePropertyView (wizard multi-step)
- [ ] Upload de imágenes
- [ ] Upload de documentos
- [ ] Token calculator
- [ ] useToken hook
- [ ] tokenService
- [ ] Integración con Stellar SDK
- [ ] Modal de confirmación de compra

### Fase 5: Wallet & Blockchain (Week 5)
- [ ] Freighter Wallet integration
- [ ] Stellar client utilities
- [ ] Smart contract interactions
- [ ] Transaction signing
- [ ] Balance queries
- [ ] Transaction history from blockchain

### Fase 6: User Profile & Tokens (Week 6)
- [ ] MyTokensView
- [ ] User portfolio display
- [ ] Transaction history
- [ ] Profile settings
- [ ] Edit profile form

### Fase 7: Polish & Optimization (Week 7)
- [ ] Error boundaries
- [ ] Toast notifications system
- [ ] Optimistic UI updates
- [ ] Performance optimization
- [ ] Accessibility (WCAG AA)
- [ ] Testing (Jest + RTL)

---

## 📝 NOTAS IMPORTANTES PARA CLAUDE CODE

1. **El backend YA EXISTE** - solo necesitas consumir los endpoints
2. **Usa shadcn/ui** para todos los componentes base
3. **Tailwind CSS** para todo el styling, NO CSS modules
4. **TypeScript estricto** - tipos para todo
5. **React Hook Form + Zod** para formularios
6. **Context API** para auth y wallet state
7. **Custom hooks** para lógica de negocio
8. **Axios** para API calls con interceptors
9. **Mobile-first** responsive design
10. **Loading states** en TODO (skeleton, spinners, etc.)

### Estructura de archivos que debes generar:

```
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── auth/         # Login, Register forms
│   ├── property/     # Property cards, lists, forms
│   └── layout/       # Header, Footer
├── views/            # Main pages (Login, Register, Home, Property, etc.)
├── hooks/            # useAuth, useProperty, useToken
├── services/         # API services (axios instances)
├── contexts/         # Auth, Wallet contexts
├── types/            # TypeScript interfaces
├── utils/            # Helpers, validators, stellar client
└── config/           # API config, constants
```

---

**FIN DE LA DOCUMENTACIÓN**

Esta especificación contiene TODA la información visual y funcional extraída de los diagramas para que puedas implementar el frontend de Blocki con la más alta calidad técnica y UX excepcional.

Recuerda: El objetivo es crear una interfaz que inspire CONFIANZA (es blockchain + bienes raíces), sea CLARA (no todo el mundo entiende tokenización), y BELLA (competir con las mejores plataformas fintech).

¡Adelante con el desarrollo! 🚀