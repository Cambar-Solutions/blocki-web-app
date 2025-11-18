# 🏗️ ARQUITECTURA TÉCNICA - BLOCKI

> Documentación técnica profunda del sistema de tokenización inmobiliaria

---

## 📐 ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────────────┐
│                    BLOCKI PLATFORM                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   FRONTEND   │◄───┤   BACKEND    │◄───┤  BLOCKCHAIN  │ │
│  │  React SPA   │    │  Node.js API │    │   Stellar    │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                    │                    │         │
│         │                    │                    │         │
│    [Freighter]          [PostgreSQL]         [Soroban]     │
│    [Driver.js]          [S3/Images]          [Horizon]     │
│    [ZK Circuit]         [Webhooks]           [Assets]      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 FRONTEND ARCHITECTURE

### Tech Stack:

```javascript
{
  "framework": "React 18.3.1",
  "buildTool": "Vite 6.0.1",
  "language": "JavaScript (convertido desde TypeScript)",
  "styling": "Tailwind CSS v4",
  "routing": "React Router v7.1.1",
  "stateManagement": "React Query (TanStack v5.64.2)",
  "forms": "React Hook Form",
  "wallet": "Freighter SDK",
  "blockchain": "@stellar/stellar-sdk v14.0.0"
}
```

### Estructura de Carpetas:

```
src/
├── components/
│   ├── kyc/
│   │   └── ZKKYCVerification.jsx      # Componente ZK-KYC
│   ├── layout/
│   │   ├── Layout.jsx                 # Layout principal con navbar
│   │   ├── Header.jsx                 # Header con wallet status
│   │   └── Footer.jsx                 # Footer con links
│   ├── properties/
│   │   ├── PropertyCard.jsx           # Card de propiedad
│   │   └── PropertyForm.jsx           # Formulario publicar
│   ├── wallet/
│   │   ├── WalletConnect.jsx          # Botón conectar wallet
│   │   └── WalletStatus.jsx           # Estado de wallet
│   └── ui/
│       ├── Button.jsx                 # Componente button
│       ├── Card.jsx                   # Card component
│       ├── Badge.jsx                  # Badge component
│       └── ...                        # Otros componentes UI
│
├── pages/
│   ├── Home.jsx                       # Landing page
│   ├── Dashboard.jsx                  # Dashboard inversiones
│   ├── Wallet.jsx                     # Gestión de wallet
│   ├── Profile.jsx                    # Perfil + ZK-KYC
│   ├── PublishProperty.jsx            # Publicar propiedad
│   └── PropertyView.jsx               # Vista detalle propiedad
│
├── hooks/
│   ├── useWallet.js                   # Hook wallet connection
│   ├── useAuth.js                     # Hook autenticación
│   ├── useZKKYC.js                    # Hook ZK-KYC
│   ├── useTour.js                     # Hook Driver.js tours
│   ├── useProperties.js               # Hook propiedades
│   └── useMarketplace.js              # Hook marketplace
│
├── services/
│   ├── stellar.js                     # Stellar SDK wrapper
│   ├── soroban.js                     # Soroban RPC client
│   ├── zkKYC.js                       # ZK proof generation
│   └── api.js                         # Backend API client
│
├── contexts/
│   ├── AuthContext.jsx                # Auth global state
│   ├── WalletContext.jsx              # Wallet global state
│   ├── PropertyContext.jsx            # Properties state
│   └── ThemeContext.jsx               # Dark/Light mode
│
├── lib/
│   ├── constants.js                   # Constantes (RPC URLs, etc)
│   └── utils.js                       # Utilidades (formatters)
│
└── data/
    ├── mockProperties.js              # Datos mock propiedades
    └── mockPortfolio.js               # Datos mock portfolio
```

### State Management:

**React Query para Server State:**
```javascript
// Ejemplo: Fetch propiedades
const { data: properties, isLoading } = useQuery({
  queryKey: ['properties', { status: 'tokenized' }],
  queryFn: async () => {
    const response = await propertiesAPI.getAll({ status: 'tokenized' });
    return response.data;
  },
  staleTime: 1000 * 60 * 5, // 5 minutos
});
```

**React Context para Global State:**
```javascript
// WalletContext - Estado de wallet compartido
const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState('testnet');
  const [isConnected, setIsConnected] = useState(false);

  // ... lógica de conexión

  return (
    <WalletContext.Provider value={{ address, network, isConnected, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}
```

---

## ⛓️ BLOCKCHAIN ARCHITECTURE (Stellar)

### Asset Structure:

**Cada propiedad = 1 Stellar Asset único**

```javascript
// Ejemplo: Propiedad en Palermo, Buenos Aires
const propertyAsset = new Asset(
  "PROP001",                        // Asset Code (max 12 chars)
  "GCXZK...PLATFORM_ISSUER"         // Blocki como issuer
);

// Metadata asociado (on-chain o off-chain)
const metadata = {
  name: "Penthouse Palermo Soho",
  address: "Av. Santa Fe 1234, CABA",
  city: "Buenos Aires",
  country: "Argentina",
  valuation: 100000,                // USD
  totalSupply: 100000,              // 1 token = $1
  availableTokens: 25000,           // 25% en venta
  images: [
    "https://blocki.s3.amazonaws.com/prop001-1.jpg",
    "https://blocki.s3.amazonaws.com/prop001-2.jpg"
  ],
  coordinates: {
    lat: -34.5861,
    lng: -58.4173
  }
};
```

### Stellar Asset Contract (SAC):

**SAC = Smart Contract wrapper del Asset**

```rust
// Contrato Soroban - PropertyToken
#[contract]
pub struct PropertyToken;

#[contractimpl]
impl PropertyToken {
  /// Inicializar token con metadata
  pub fn initialize(
    env: Env,
    name: String,
    symbol: String,
    decimals: u32,
    property_id: String,
    valuation: i128
  ) {
    // Guardar metadata en storage
    env.storage().instance().set(&symbol!("name"), &name);
    env.storage().instance().set(&symbol!("symbol"), &symbol);
    env.storage().instance().set(&symbol!("decimals"), &decimals);
    env.storage().instance().set(&symbol!("property"), &property_id);
    env.storage().instance().set(&symbol!("value"), &valuation);
  }

  /// Obtener valuación actual
  pub fn get_valuation(env: Env) -> i128 {
    env.storage().instance().get(&symbol!("value")).unwrap()
  }

  /// Actualizar valuación (solo owner)
  pub fn update_valuation(env: Env, new_value: i128) {
    // Verificar permisos
    require_auth(&env.current_contract_address());
    env.storage().instance().set(&symbol!("value"), &new_value);
  }

  /// Distribuir dividendos a holders
  pub fn distribute_dividends(
    env: Env,
    usdc_address: Address,
    total_amount: i128
  ) {
    let token = token::Client::new(&env, &env.current_contract_address());
    let usdc = token::Client::new(&env, &usdc_address);

    // Obtener todos los holders (simplified)
    let holders = get_all_holders(&env);
    let total_supply = token.total_supply();

    for holder in holders.iter() {
      let balance = token.balance(&holder);
      let share = (balance * total_amount) / total_supply;
      usdc.transfer(&env.current_contract_address(), &holder, share);
    }
  }
}
```

### Trustline Flow:

**Antes de recibir PROP001, usuario debe crear trustline**

```javascript
// 1. Verificar si trustline existe
async function hasTrustline(publicKey, asset) {
  const account = await server.loadAccount(publicKey);
  return account.balances.some(
    b => b.asset_code === asset.code &&
         b.asset_issuer === asset.issuer
  );
}

// 2. Crear trustline si no existe
async function createTrustline(publicKey, asset, limit = "1000000") {
  const account = await server.loadAccount(publicKey);

  const transaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(Operation.changeTrust({
      asset: asset,
      limit: limit  // Máximo que puede recibir
    }))
    .setTimeout(180)
    .build();

  // Usuario firma con Freighter
  const signedXdr = await freighter.signTransaction(transaction.toXDR());

  // Enviar a Stellar
  await server.submitTransaction(
    TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET)
  );
}

// 3. Flow completo en UI
async function handleBuyTokens(propertyAsset, amount) {
  const { publicKey } = useWallet();

  // Verificar trustline
  const exists = await hasTrustline(publicKey, propertyAsset);

  if (!exists) {
    toast.info("Creando trustline...");
    await createTrustline(publicKey, propertyAsset);
  }

  // Ahora sí, transferir tokens
  await transferTokens(publicKey, propertyAsset, amount);
}
```

---

## 🔐 ZERO-KNOWLEDGE KYC ARCHITECTURE

### ZK Circuit (Conceptual):

```
INPUTS (Private):
- age: 25
- country: "Argentina"
- verified: true

CIRCUIT COMPUTATION:
- isOver18 = (age >= 18)
- isLATAM = country in [ARG, BRA, CHL, COL, MEX, PER]
- isVerified = verified === true

OUTPUTS (Public):
- proof: "eyJhbGci..." (cryptographic proof)
- publicSignals: [true, true, true]
- verificationKey: "vk_abc123"
```

### Implementation Flow:

```javascript
// 1. Usuario ingresa datos privados (local, nunca se envían)
const privateData = {
  age: 25,
  country: "Argentina",
  verified: true
};

// 2. Generar prueba ZK (computación en navegador)
const zkProof = await generateKYCProof(
  privateData.age,
  privateData.country,
  privateData.verified
);

// Resultado:
{
  proof: "eyJjbGFpbXMiOnsia...",  // Prueba encriptada
  publicSignals: ["true", "true", "true"],  // Solo booleans
  verificationKey: "vk_7f2a1c"
}

// 3. Cualquiera puede verificar (sin ver datos privados)
const isValid = await verifyKYCProof(zkProof);
console.log(isValid);  // true

// 4. Registrar commitment en blockchain
const proofHash = hashProof(zkProof);  // 0x1a2b3c...
const txHash = await submitProofToStellar(proofHash, userPublicKey);

// 5. Crear credencial reutilizable
const credential = await createVerifiableCredential(zkProof, userPublicKey);
// Válido por 90 días
```

### Stellar Integration:

```javascript
// Guardar hash commitment en Stellar Memo
const transaction = new TransactionBuilder(account)
  .addOperation(Operation.payment({
    destination: PLATFORM_ADDRESS,
    asset: Asset.native(),
    amount: "0.0000001"  // Mínimo
  }))
  .addMemo(Memo.hash(proofHash))  // ZK proof commitment
  .build();

// Ahora el proof está inmutable on-chain
// Cualquiera puede verificar sin acceder a datos privados
```

---

## 💱 DEX INTEGRATION (Soroswap)

### Token Trading Flow:

```javascript
// Usuario quiere vender 10 PROP001 tokens
// Otro usuario quiere comprar con USDC

// 1. Obtener quote de precio
const soroswap = new SoroswapSDK({
  network: Networks.TESTNET
});

const quote = await soroswap.quote({
  assetIn: PROP001_ADDRESS,
  assetOut: USDC_ADDRESS,
  amount: "10"  // 10 tokens
});

console.log(quote);
// {
//   amountOut: "12.50",  // Recibe 12.50 USDC
//   priceImpact: 0.02,   // 2% slippage
//   route: [PROP001, XLM, USDC]  // Ruta del swap
// }

// 2. Ejecutar swap
const swapTx = await soroswap.swap({
  quote: quote,
  userAddress: sellerAddress,
  slippageTolerance: 0.05  // 5% max slippage
});

// 3. Usuario firma
const signedXdr = await freighter.signTransaction(swapTx.xdr);

// 4. Enviar a blockchain
const result = await soroswap.sendTransaction(signedXdr);

console.log(`Swap exitoso: ${result.hash}`);
```

### Liquidity Pool:

```javascript
// Propietario agrega liquidez PROP001/USDC
const addLiquidityTx = await soroswap.addLiquidity({
  tokenA: PROP001_ADDRESS,
  tokenB: USDC_ADDRESS,
  amountA: "1000",   // 1000 PROP001
  amountB: "1200",   // 1200 USDC (ratio 1:1.2)
  userAddress: ownerAddress
});

// Recibe LP tokens representando su share del pool
// Gana fees de trading (0.3% por swap)
```

---

## 🗄️ BACKEND ARCHITECTURE

### API Endpoints:

```
POST   /api/auth/challenge          # Obtener challenge para firma
POST   /api/auth/verify              # Verificar firma y login
POST   /api/auth/logout              # Logout

GET    /api/properties               # Listar propiedades
GET    /api/properties/:id           # Detalle de propiedad
POST   /api/properties               # Publicar propiedad (requires auth)
PUT    /api/properties/:id           # Actualizar propiedad
POST   /api/properties/:id/images    # Upload imágenes

GET    /api/marketplace/listings     # Listar ventas activas
GET    /api/marketplace/stats        # Estadísticas marketplace
POST   /api/marketplace/buy           # Comprar tokens
POST   /api/marketplace/sell          # Vender tokens

GET    /api/users/me                 # Perfil usuario
PUT    /api/users/me                 # Actualizar perfil
GET    /api/users/portfolio           # Portfolio inversiones
GET    /api/users/transactions        # Historial transacciones

POST   /api/kyc/submit                # Enviar documentos KYC tradicional
GET    /api/kyc/status                # Estado KYC
POST   /api/kyc/zk-proof              # Guardar ZK proof hash

POST   /webhooks/stellar              # Webhook transacciones Stellar
```

### Database Schema (PostgreSQL):

```sql
-- Usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stellar_address VARCHAR(56) UNIQUE NOT NULL,
  email VARCHAR(255),
  name VARCHAR(100),
  country VARCHAR(50),
  kyc_status VARCHAR(20) DEFAULT 'not_started',  -- not_started, pending, approved, rejected
  zk_kyc_proof_hash VARCHAR(66),  -- Hash del ZK proof
  zk_kyc_verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Propiedades
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id),
  stellar_asset_code VARCHAR(12) NOT NULL,
  stellar_asset_issuer VARCHAR(56) NOT NULL,
  sac_contract_address VARCHAR(56),  -- Soroban contract

  title VARCHAR(200) NOT NULL,
  description TEXT,
  address VARCHAR(300),
  city VARCHAR(100),
  country VARCHAR(50),

  valuation DECIMAL(15, 2) NOT NULL,  -- USD
  total_tokens BIGINT NOT NULL,
  available_tokens BIGINT NOT NULL,

  metadata JSONB,  -- {images, coordinates, features}
  status VARCHAR(20) DEFAULT 'pending',  -- pending, verified, tokenized, active

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Transacciones
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stellar_tx_hash VARCHAR(64) UNIQUE NOT NULL,

  from_address VARCHAR(56),
  to_address VARCHAR(56),
  property_id UUID REFERENCES properties(id),

  type VARCHAR(20) NOT NULL,  -- buy, sell, transfer, dividend
  amount DECIMAL(15, 7) NOT NULL,  -- Cantidad de tokens
  price_per_token DECIMAL(15, 2),  -- USD por token

  status VARCHAR(20) DEFAULT 'pending',  -- pending, confirmed, failed
  confirmed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Ownership (quien tiene qué tokens)
CREATE TABLE ownerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),

  tokens_amount DECIMAL(15, 7) NOT NULL,
  purchase_price_per_token DECIMAL(15, 2),  -- Precio al que compró
  purchase_date TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, property_id)
);

-- Indices
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_asset ON properties(stellar_asset_code, stellar_asset_issuer);
CREATE INDEX idx_transactions_property ON transactions(property_id);
CREATE INDEX idx_transactions_addresses ON transactions(from_address, to_address);
CREATE INDEX idx_ownerships_user ON ownerships(user_id);
```

---

## 🔄 TRANSACTION FLOWS

### Flow 1: Publicar Propiedad

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Usuario │      │ Frontend │      │  Backend   │      │ Stellar  │
└────┬────┘      └────┬─────┘      └─────┬──────┘      └────┬─────┘
     │                │                    │                   │
     │ 1. Fill form   │                    │                   │
     ├───────────────>│                    │                   │
     │                │ 2. POST /properties│                   │
     │                ├───────────────────>│                   │
     │                │                    │ 3. Create Asset   │
     │                │                    ├──────────────────>│
     │                │                    │ 4. Asset Created  │
     │                │                    │<──────────────────┤
     │                │                    │ 5. Deploy SAC     │
     │                │                    ├──────────────────>│
     │                │                    │ 6. SAC Address    │
     │                │                    │<──────────────────┤
     │                │                    │ 7. Save to DB     │
     │                │                    │                   │
     │                │ 8. Property ID     │                   │
     │                │<───────────────────┤                   │
     │ 9. Success     │                    │                   │
     │<───────────────┤                    │                   │
```

### Flow 2: Comprar Tokens

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Buyer   │      │ Frontend │      │  Backend   │      │ Stellar  │
└────┬────┘      └────┬─────┘      └─────┬──────┘      └────┬─────┘
     │                │                    │                   │
     │ 1. Select qty  │                    │                   │
     ├───────────────>│                    │                   │
     │                │ 2. Check trustline │                   │
     │                ├───────────────────────────────────────>│
     │                │                    │ 3. Exists?        │
     │                │<───────────────────────────────────────┤
     │                │ 4. Create if needed│                   │
     │                ├───────────────────────────────────────>│
     │ 5. Sign (Freighter)                 │                   │
     │<───────────────┤                    │                   │
     │ 6. Signed XDR  │                    │                   │
     ├───────────────>│                    │                   │
     │                │ 7. Build payment tx│                   │
     │                ├───────────────────────────────────────>│
     │ 8. Sign payment│                    │                   │
     │<───────────────┤                    │                   │
     │ 9. Signed XDR  │                    │                   │
     ├───────────────>│ 10. POST /buy      │                   │
     │                ├───────────────────>│                   │
     │                │                    │ 11. Submit tx     │
     │                │                    ├──────────────────>│
     │                │                    │ 12. Tx hash       │
     │                │                    │<──────────────────┤
     │                │                    │ 13. Save tx DB    │
     │                │ 14. Success + hash │                   │
     │                │<───────────────────┤                   │
     │ 15. Tokens     │                    │                   │
     │    received!   │                    │                   │
     │<───────────────┤                    │                   │
```

---

## 🧪 TESTING STRATEGY

### Unit Tests:

```javascript
// Ejemplo: zkKYC.test.js
import { generateKYCProof, verifyKYCProof } from '../services/zkKYC';

describe('ZK-KYC Service', () => {
  test('should generate valid proof for user over 18 in LATAM', async () => {
    const proof = await generateKYCProof(25, 'Argentina', true);

    expect(proof).toHaveProperty('proof');
    expect(proof).toHaveProperty('publicSignals');
    expect(proof.publicSignals).toEqual(['true', 'true', 'true']);
  });

  test('should fail for user under 18', async () => {
    const proof = await generateKYCProof(16, 'Argentina', true);
    expect(proof.publicSignals[0]).toBe('false');  // isOver18
  });

  test('should verify valid proof', async () => {
    const proof = await generateKYCProof(25, 'Argentina', true);
    const isValid = await verifyKYCProof(proof);
    expect(isValid).toBe(true);
  });
});
```

### Integration Tests:

```javascript
// Ejemplo: stellar.integration.test.js
import { createPaymentTransaction, submitTransaction } from '../services/stellar';
import { generateKeypair } from '../services/stellar';

describe('Stellar Integration', () => {
  let issuerKeypair, distributorKeypair;

  beforeAll(async () => {
    issuerKeypair = generateKeypair();
    distributorKeypair = generateKeypair();

    // Fund accounts on testnet
    await fundTestnetAccount(issuerKeypair.publicKey());
    await fundTestnetAccount(distributorKeypair.publicKey());
  });

  test('should create and submit payment transaction', async () => {
    const tx = await createPaymentTransaction(
      issuerKeypair.publicKey(),
      distributorKeypair.publicKey(),
      '100',
      Asset.native()
    );

    tx.sign(issuerKeypair);
    const result = await submitTransaction(tx);

    expect(result.successful).toBe(true);
    expect(result).toHaveProperty('hash');
  });
});
```

---

## 📊 MONITORING & OBSERVABILITY

### Metrics to Track:

```javascript
// Frontend Analytics
{
  "pageViews": "Home, Dashboard, Properties",
  "walletConnections": "Freighter success rate",
  "tourCompletions": "Driver.js tour finish rate",
  "zkKYCVerifications": "ZK proof generations"
}

// Blockchain Metrics
{
  "transactionsSubmitted": "Total tx count",
  "transactionSuccessRate": "% successful",
  "averageTransactionFee": "XLM",
  "assetsCreated": "New PROP### assets",
  "trustlinesCreated": "User trustlines"
}

// Business Metrics
{
  "propertiesListed": "Total properties",
  "tokensSold": "Volume traded",
  "revenueGenerated": "Fees collected",
  "activeUsers": "DAU, MAU"
}
```

### Error Tracking:

```javascript
// Ejemplo con Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://...@sentry.io/...",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Capturar errores Stellar
try {
  await submitTransaction(tx);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      type: 'stellar_transaction',
      asset: propertyAsset.code
    }
  });
  throw error;
}
```

---

## 🔒 SECURITY CONSIDERATIONS

### Best Practices:

1. **Never Store Private Keys:**
   - Usuario mantiene seed phrase
   - Freighter maneja firma de transacciones
   - Backend nunca ve private keys

2. **Input Validation:**
   ```javascript
   // Validar addresses Stellar
   function isValidStellarAddress(address) {
     return /^G[A-Z0-9]{55}$/.test(address);
   }

   // Validar amounts
   function isValidAmount(amount) {
     return !isNaN(amount) && parseFloat(amount) > 0;
   }
   ```

3. **Rate Limiting:**
   ```javascript
   // Backend - Express rate limit
   const rateLimit = require('express-rate-limit');

   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,  // 15 minutos
     max: 100  // 100 requests max
   });

   app.use('/api/', apiLimiter);
   ```

4. **CSRF Protection:**
   ```javascript
   // Backend - csurf middleware
   const csrf = require('csurf');
   app.use(csrf({ cookie: true }));
   ```

5. **ZK Proof Verification:**
   ```javascript
   // Siempre verificar proof antes de aceptar
   async function handleZKProofSubmission(proof) {
     const isValid = await verifyKYCProof(proof);
     if (!isValid) {
       throw new Error('Invalid ZK proof');
     }
     // Guardar hash commitment
     await saveProofHash(proof);
   }
   ```

---

## 📦 DEPLOYMENT

### Frontend (Vercel/Netlify):

```bash
# Build
npm run build

# Deploy
vercel --prod

# Env variables en Vercel:
VITE_STELLAR_NETWORK=testnet
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_API_URL=https://api.blocki.io
```

### Backend (Railway/Render):

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

### Smart Contracts (Soroban):

```bash
# Build contract
cargo build --target wasm32-unknown-unknown --release

# Optimize WASM
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/property_token.wasm

# Deploy to testnet
soroban contract deploy \
  --wasm property_token_optimized.wasm \
  --source ADMIN_SECRET_KEY \
  --network testnet
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Frontend:

1. **Code Splitting:**
   ```javascript
   // Lazy load páginas
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const PropertyView = lazy(() => import('./pages/PropertyView'));
   ```

2. **Image Optimization:**
   ```javascript
   // Next/Image para optimización automática
   <Image
     src={property.image}
     width={400}
     height={300}
     loading="lazy"
     placeholder="blur"
   />
   ```

3. **React Query Caching:**
   ```javascript
   // Cache queries por 5 minutos
   staleTime: 1000 * 60 * 5
   ```

### Blockchain:

1. **Batch Transactions:**
   ```javascript
   // Agrupar operaciones en 1 tx
   const tx = new TransactionBuilder(account)
     .addOperation(op1)
     .addOperation(op2)
     .addOperation(op3)
     .build();
   // 3 operaciones, 1 fee
   ```

2. **Trustline Pre-creation:**
   ```javascript
   // Crear trustlines de assets populares de antemano
   const popularAssets = [USDC, XLM, PROP001];
   await Promise.all(
     popularAssets.map(asset => createTrustline(userAddress, asset))
   );
   ```

---

*Este documento debe actualizarse conforme evoluciona la arquitectura* 🏗️
