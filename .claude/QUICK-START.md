# ⚡ QUICK START - BLOCKI

> Guía rápida para entender el proyecto y empezar a trabajar en 10 minutos

---

## 🎯 EL PROYECTO EN 3 LÍNEAS

**BLOCKI = Airbnb de Inversión Inmobiliaria**

1. **Propietarios** publican propiedades y venden **porcentajes tokenizados** (ej: 25% de una casa)
2. **Inversores** compran tokens desde **$100 USD**, usando criptomonedas
3. **Tokens se valorizan** cuando la propiedad sube de precio (+ apreciación de la cripto)

---

## 📚 DOCUMENTACIÓN DISPONIBLE 

```
.claude/
├── README-PROYECTO.md       ← 🌟 EMPEZAR AQUÍ (idea completa)
├── ARQUITECTURA.md          ← Detalles técnicos profundos
├── ROADMAP.md               ← Plan de implementación
├── QUICK-START.md           ← Esta guía
├── ZK-IMPLEMENTATION.md     ← Zero-Knowledge KYC
├── PITCH-GUIDE.md           ← Guía para presentación hackathon
└── DRIVER-JS-IMPROVEMENTS.md ← Tours interactivos

Históricos (NO MODIFICAR):
├── primera-version-ui.txt
├── segunda-version-ui.txt
└── tercera-version-ui.txt
```

**LEE PRIMERO:** `README-PROYECTO.md` (15 min de lectura)

---

## 🚀 SETUP LOCAL (5 MINUTOS)

### 1. Clonar Repositorio

```bash
cd blocki-web-app/blocki-web-app
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Variables de Entorno

Crear `.env`:

```bash
VITE_STELLAR_NETWORK=testnet
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_API_URL=http://localhost:3000
```

### 4. Ejecutar Dev Server

```bash
npm run dev
```

Abre: **http://localhost:5173**

### 5. Instalar Freighter Wallet (Extensión Chrome)

1. Ir a: https://www.freighter.app/
2. Instalar extensión
3. Crear nueva wallet
4. Cambiar a **TESTNET**
5. Copiar dirección pública

### 6. Fondear Wallet en Testnet

Ir a: https://laboratory.stellar.org/#account-creator?network=test

Pegar tu dirección pública → **Fund Account**

---

## 🏗️ ESTRUCTURA DEL PROYECTO

```
blocki-web-app/
├── src/
│   ├── components/
│   │   ├── kyc/ZKKYCVerification.jsx   ← Componente estrella ZK-KYC
│   │   ├── layout/Layout.jsx           ← Layout principal
│   │   ├── properties/PropertyCard.jsx ← Card de propiedad
│   │   └── ui/                         ← Componentes reutilizables
│   │
│   ├── pages/
│   │   ├── Home.jsx                    ← Landing page
│   │   ├── Dashboard.jsx               ← Dashboard inversiones
│   │   ├── Profile.jsx                 ← Perfil con ZK-KYC
│   │   ├── Wallet.jsx                  ← Gestión wallet
│   │   └── PublishProperty.jsx         ← Publicar propiedad
│   │
│   ├── hooks/
│   │   ├── useWallet.js                ← Hook wallet (Freighter)
│   │   ├── useZKKYC.js                 ← Hook ZK-KYC
│   │   └── useTour.js                  ← Hook tours educativos
│   │
│   ├── services/
│   │   ├── stellar.js                  ← Stellar SDK wrapper
│   │   ├── soroban.js                  ← Soroban RPC
│   │   └── zkKYC.js                    ← ZK proof generation
│   │
│   └── contexts/
│       ├── WalletContext.jsx           ← Estado global wallet
│       └── AuthContext.jsx             ← Auth state
│
└── .claude/                            ← Documentación
```

---

## 🎯 FEATURES PRINCIPALES

### 1. Wallet Connection (Freighter)

**Código:**
```javascript
// hooks/useWallet.js
export function useWallet() {
  const connect = async () => {
    const publicKey = await freighter.getPublicKey();
    setAddress(publicKey);
  };

  return { address, connect, disconnect };
}
```

**Dónde se usa:**
- Header (botón conectar)
- Todas las páginas protegidas

---

### 2. Zero-Knowledge KYC ⭐

**¿Qué es?**
- Usuario prueba edad +18, residencia LATAM, identidad verificada
- **SIN revelar** datos exactos (edad, país, documentos)
- Solo se guarda hash commitment en blockchain

**Código:**
```javascript
// services/zkKYC.js
const proof = await generateKYCProof(25, 'Argentina', true);
// proof = { proof: "...", publicSignals: ["true", "true", "true"] }

const isValid = await verifyKYCProof(proof);
// isValid = true
```

**Dónde se usa:**
- `/profile` → Componente ZKKYCVerification completo

---

### 3. Tours Educativos (Driver.js)

**Qué hacen:**
- Explican la app a usuarios nuevos
- 5 tours: Home, Dashboard, Wallet, Profile (ZK-KYC), Publish

**Código:**
```javascript
// hooks/useTour.js
const { homeTour, zkKYCTour } = useTour();

// Lanzar tour
homeTour();  // Tour del home
zkKYCTour(); // Tour explicando ZK-KYC
```

**Dónde se activan:**
- Botón "?" en Header
- Detecta página actual automáticamente

---

### 4. Tokenización de Propiedades

**Flow:**
```
1. Propietario publica propiedad → /publish
2. Platform crea Stellar Asset (PROP001)
3. Deploy SAC (Stellar Asset Contract)
4. Emite tokens al distributor
5. Inversores compran tokens → /marketplace
6. Tokens se valorizan → Dashboard muestra ROI
```

**Código (Stellar SDK):**
```javascript
// services/stellar.js
const propertyAsset = new Asset("PROP001", issuerPublicKey);

// Crear trustline
await createTrustline(userAddress, propertyAsset);

// Transferir tokens
await transferTokens(userAddress, propertyAsset, amount);
```

---

## 🔧 COMANDOS ÚTILES

### Desarrollo:
```bash
npm run dev          # Dev server (hot reload)
npm run build        # Build producción
npm run preview      # Preview build
```

### Linting:
```bash
npm run lint         # ESLint
```

### Testing (cuando lo agreguemos):
```bash
npm run test         # Run tests
npm run test:watch   # Watch mode
```

---

## 🌐 NAVEGACIÓN DE LA APP

```
/ (redirige a /login)
  ↓
/login (auth con Freighter)
  ↓
/home ← Landing page con propiedades
  ├── /property/:id ← Vista detalle de propiedad
  │
/dashboard ← Portfolio de inversiones
  ├── Ver propiedades en las que invertiste
  ├── ROI calculado
  └── Transacciones recientes
  │
/wallet ← Gestión de wallet
  ├── Balances (XLM, USDC, PROP tokens)
  ├── Enviar/Recibir
  └── Historial
  │
/profile ← Perfil + ZK-KYC ⭐
  ├── Información personal
  ├── Wallet conectada
  └── Verificación ZK-KYC (componente completo)
  │
/publish ← Publicar propiedad
  └── Formulario para propietarios
```

---

## 🎨 ESTILOS & UI

### Tailwind CSS v4:
```javascript
// Ejemplo de uso
<div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6">
  <h2 className="text-2xl font-bold text-white">Título</h2>
</div>
```

### Dark Mode:
```javascript
// Automático con ThemeContext
const { theme, toggleTheme } = useTheme();

<div className="bg-white dark:bg-gray-900">
  {/* Se adapta al tema */}
</div>
```

### Componentes UI:
```javascript
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

<Button variant="primary" size="lg">
  Comprar Tokens
</Button>
```

---

## 📡 STELLAR TESTNET

### Network Info:
```javascript
const NETWORKS = {
  testnet: {
    networkPassphrase: Networks.TESTNET,
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org:443'
  }
};
```

### Explorar Testnet:
- **Stellar Expert:** https://stellar.expert/explorer/testnet
- **Laboratory:** https://laboratory.stellar.org
- **Friendbot (faucet):** https://friendbot.stellar.org

---

## 🐛 DEBUGGING TIPS

### 1. Wallet no conecta:
```bash
✓ Verificar Freighter instalado
✓ Verificar está en TESTNET (no mainnet)
✓ Abrir DevTools → Console para ver errores
```

### 2. Transacción falla:
```bash
✓ Verificar fondos suficientes (XLM para fees)
✓ Verificar trustline existe para el asset
✓ Ver detalles en Stellar Expert con el tx hash
```

### 3. Build falla:
```bash
✓ Borrar node_modules: rm -rf node_modules
✓ Reinstalar: npm install
✓ Limpiar cache: npm cache clean --force
```

### 4. Ver logs de Stellar:
```javascript
// Agregar en stellar.js
console.log('Transaction XDR:', transaction.toXDR());
console.log('Signed XDR:', signedXdr);
```

---

## 📖 CONCEPTOS CLAVE

### Assets en Stellar:
```javascript
// Asset = Token personalizado en Stellar
const asset = new Asset(
  "PROP001",        // Código (max 12 chars)
  issuerPublicKey   // Quién lo emite
);
```

### Trustlines:
```javascript
// Antes de recibir un asset, crear trustline
await server.loadAccount(userAddress)
  .then(account => {
    const tx = new TransactionBuilder(account)
      .addOperation(Operation.changeTrust({
        asset: propertyAsset,
        limit: "1000000"
      }))
      .build();
  });
```

### Soroban (Smart Contracts):
```rust
// Contratos en Rust compilados a WASM
#[contract]
pub struct PropertyToken;

#[contractimpl]
impl PropertyToken {
  pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
    // Lógica de transfer
  }
}
```

---

## 🎯 TAREAS COMUNES

### Agregar Nueva Página:

1. **Crear archivo:**
```bash
touch src/pages/NewPage.jsx
```

2. **Crear componente:**
```javascript
export function NewPage() {
  return (
    <Layout>
      <h1>Nueva Página</h1>
    </Layout>
  );
}
```

3. **Agregar ruta:**
```javascript
// App.jsx
import { NewPage } from './pages/NewPage';

<Route path="/new" element={
  <ProtectedRoute>
    <NewPage />
  </ProtectedRoute>
} />
```

---

### Agregar Nuevo Hook:

1. **Crear archivo:**
```bash
touch src/hooks/useMyHook.js
```

2. **Implementar:**
```javascript
import { useState, useEffect } from 'react';

export function useMyHook() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Lógica
  }, []);

  return { data };
}
```

3. **Usar:**
```javascript
import { useMyHook } from '@/hooks/useMyHook';

const { data } = useMyHook();
```

---

## 🚦 CHECKLIST ANTES DE COMMIT

```markdown
□ npm run dev (verifica que corre sin errores)
□ npm run build (verifica que buildea)
□ Probar feature en navegador
□ Revisar console (no debe haber errores rojos)
□ Dark mode funciona?
□ Responsive en móvil?
□ Git add solo archivos relevantes
□ Commit message descriptivo
```

---

## 🆘 RECURSOS DE AYUDA

### Documentación:
- **Stellar Docs:** https://developers.stellar.org
- **Soroban Docs:** https://soroban.stellar.org
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com

### Ejemplos de Código:
- **stellar-workshop:** Ejemplos de transacciones, DEX, vaults
- **stellar-docs:** Ejemplos de assets, trustlines, contratos

### Comunidad:
- **Stellar Discord:** https://discord.gg/stellardev
- **Stack Overflow:** Tag `stellar`

---

## 🎯 PRÓXIMO PASO

**LEER:** `README-PROYECTO.md` para entender la visión completa

**LUEGO:** Explorar el código en `src/` y ejecutar `npm run dev`

**DESPUÉS:** Ver `ROADMAP.md` para saber qué implementar

---

*¡Welcome to the team! 🚀*
