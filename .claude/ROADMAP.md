# 🗺️ ROADMAP DE IMPLEMENTACIÓN - BLOCKI

> Plan detallado paso a paso para completar el MVP y escalar la plataforma

---

## 📅 TIMELINE GENERAL

```
[FASE 1]════════════════════> [FASE 2]═════════════════> [FASE 3]════════════> [FASE 4]
Pre-Hackathon (95% completo)   Post-Hackathon (2-3 meses)  Piloto (6 meses)   Producción (12 meses)
```

---

## ✅ FASE 1: MVP HACKATHON (PRE-HACKATHON)

### Estado Actual: **95% COMPLETADO**

#### ✅ Completado:

**Frontend:**
- [x] Estructura completa de carpetas
- [x] Componentes UI (Button, Card, Badge, etc.)
- [x] Layout con Header/Footer responsive
- [x] Páginas: Home, Dashboard, Wallet, Profile
- [x] Componente ZK-KYC completo
- [x] Tours interactivos con Driver.js (29 pasos)
- [x] Dark mode nativo
- [x] Internacionalización LATAM

**Blockchain:**
- [x] Integración Stellar SDK
- [x] Servicio Soroban RPC
- [x] Wallet connection (Freighter)
- [x] Trustline verification
- [x] Funciones básicas de transacciones

**ZK-KYC:**
- [x] Servicio zkKYC con simulación de proofs
- [x] Hook useZKKYC
- [x] Componente UI ZKKYCVerification
- [x] Documentación completa

**Documentación:**
- [x] README-PROYECTO.md
- [x] ARQUITECTURA.md
- [x] ZK-IMPLEMENTATION.md
- [x] PITCH-GUIDE.md
- [x] DRIVER-JS-IMPROVEMENTS.md

---

#### ⏳ Pendiente (5% restante):

**Critical para Demo:**
- [ ] **Deploy SAC Real en Soroban Testnet**
  ```bash
  # Pasos:
  1. Compilar contrato Rust
  2. Optimizar WASM
  3. Deploy con soroban CLI
  4. Guardar contract address en constants.js
  ```

- [ ] **Conectar Frontend con Testnet Real**
  ```javascript
  // Actualizar en .env
  VITE_STELLAR_NETWORK=testnet
  VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443

  // Probar creación de asset real
  const asset = new Asset("DEMO001", issuerPublicKey);
  ```

- [ ] **Generar 1-2 Propiedades de Demostración**
  ```javascript
  // Crear en testnet:
  - PROP001: Penthouse Palermo, Buenos Aires ($100K)
  - PROP002: Apartment Providencia, Santiago ($80K)
  ```

- [ ] **Preparar Pitch Slides (opcional pero recomendado)**
  - Usar PITCH-GUIDE.md como base
  - 5-7 diapositivas con capturas de pantalla
  - Demo flow diagrama

---

### 🎯 Tareas Pre-Hackathon (1-2 días):

```markdown
DÍA 1: Blockchain Real
□ Compilar contrato PropertyToken en Rust
□ Deploy a Soroban testnet
□ Crear 2 assets PROP001, PROP002
□ Verificar en Stellar Expert

DÍA 2: Testing & Polish
□ Test end-to-end: conectar wallet → comprar tokens
□ Verificar ZK-KYC flow completo
□ Agregar loading states donde falten
□ Revisar responsive mobile
□ Practicar pitch (5 min)
```

---

## 🚧 FASE 2: POST-HACKATHON (si ganamos)

### Duración: **2-3 meses**
### Objetivo: **Producto Beta listo para usuarios reales**

---

### Sprint 1: Backend Completo (Semana 1-2)

#### 1.1 Setup Inicial
```bash
□ Crear repo backend separado
□ Setup Express.js + TypeScript
□ Configurar PostgreSQL database
□ Setup Railway/Render para hosting
□ Configurar env variables
```

#### 1.2 Implementar API Endpoints

**Auth Endpoints:**
```javascript
POST /api/auth/challenge
  - Generar nonce random
  - Guardar en Redis (5 min TTL)
  - Retornar: { challenge: "abc123" }

POST /api/auth/verify
  - Recibir { publicKey, signature, challenge }
  - Verificar firma: StrKey.verify(challenge, signature, publicKey)
  - Crear JWT token
  - Retornar: { token, user }

POST /api/auth/logout
  - Invalidar JWT token
```

**Properties Endpoints:**
```javascript
GET /api/properties
  - Query params: status, city, country, priceRange
  - JOIN con ownerships para calcular disponibles
  - Retornar array de propiedades

GET /api/properties/:id
  - Detalles completos de propiedad
  - Incluir ownership distribution
  - Incluir transaction history

POST /api/properties
  - Middleware: requireAuth
  - Validar datos con Joi/Zod
  - Upload imágenes a S3/Cloudinary
  - Crear asset en Stellar
  - Deploy SAC contract
  - Guardar en DB
  - Retornar: { propertyId, assetCode, sacAddress }

PUT /api/properties/:id
  - Middleware: requireAuth + isOwner
  - Solo permitir actualizar: description, images
  - NO permitir cambiar: valuation, tokens (inmutable)
```

**Marketplace Endpoints:**
```javascript
POST /api/marketplace/buy
  - Validar: usuario tiene fondos, trustline existe
  - Crear payment transaction
  - Guardar pending transaction en DB
  - Webhook escucha confirmación
  - Actualizar ownership en DB

POST /api/marketplace/sell
  - Similar a buy pero reverso

GET /api/marketplace/stats
  - Aggregations SQL: total volume, avg price, etc.
```

#### 1.3 Database Migrations

```sql
-- Migration 001: Initial schema
CREATE TABLE users (...);
CREATE TABLE properties (...);
CREATE TABLE transactions (...);
CREATE TABLE ownerships (...);

-- Migration 002: Indices
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_transactions_property ON transactions(property_id);

-- Migration 003: ZK-KYC
ALTER TABLE users ADD COLUMN zk_proof_hash VARCHAR(66);
ALTER TABLE users ADD COLUMN zk_verified_at TIMESTAMP;
```

#### 1.4 Stellar Webhooks

```javascript
// Escuchar transacciones confirmadas
const stellarServer = new Server(HORIZON_URL);

stellarServer
  .transactions()
  .cursor('now')
  .stream({
    onmessage: async (tx) => {
      // Parsear memo para encontrar nuestras txs
      if (tx.memo_type === 'hash') {
        await handleConfirmedTransaction(tx);
      }
    }
  });

async function handleConfirmedTransaction(tx) {
  // Actualizar DB: pending → confirmed
  await db.transaction.update({
    where: { stellar_hash: tx.hash },
    data: { status: 'confirmed', confirmed_at: new Date() }
  });

  // Actualizar ownership
  await recalculateOwnership(tx.propertyId);
}
```

---

### Sprint 2: Smart Contracts Soroban (Semana 3-4)

#### 2.1 Property Token Contract (Rust)

```rust
// contracts/property-token/src/lib.rs

use soroban_sdk::contractimpl;

pub struct PropertyToken;

#[contractimpl]
impl PropertyToken {
  /// Initialize property token
  pub fn initialize(
    env: Env,
    admin: Address,
    name: String,
    symbol: String,
    property_id: String,
    valuation: i128,
    total_supply: i128
  ) {
    // Implementar OpenZeppelin Token base
    token::initialize(&env, admin, 7, name, symbol);

    // Guardar metadata adicional
    env.storage().instance().set(&symbol!("property"), &property_id);
    env.storage().instance().set(&symbol!("valuation"), &valuation);
    env.storage().instance().set(&symbol!("supply"), &total_supply);
  }

  /// Mint tokens (solo admin)
  pub fn mint(env: Env, to: Address, amount: i128) {
    require_auth(&admin_address(&env));
    token::mint(&env, &to, amount);
  }

  /// Transfer with additional checks
  pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
    // Verificar KYC status (opcional)
    require_kyc_verified(&env, &to);

    // Transfer normal
    token::transfer(&env, &from, &to, amount);

    // Emitir evento
    env.events().publish(
      (symbol!("Transfer"), &from, &to),
      amount
    );
  }

  /// Distribute dividends
  pub fn distribute_dividends(
    env: Env,
    usdc: Address,
    amount: i128
  ) -> Vec<(Address, i128)> {
    require_auth(&admin_address(&env));

    let total_supply = token::total_supply(&env);
    let holders = get_all_holders(&env);
    let mut distributions = Vec::new(&env);

    for holder in holders.iter() {
      let balance = token::balance(&env, &holder);
      let share = (balance * amount) / total_supply;

      // Transfer USDC
      let usdc_client = token::Client::new(&env, &usdc);
      usdc_client.transfer(&env.current_contract_address(), &holder, share);

      distributions.push_back((holder.clone(), share));
    }

    distributions
  }
}
```

#### 2.2 Testing Contracts

```rust
#[test]
fn test_mint_tokens() {
  let env = Env::default();
  let contract_id = env.register_contract(None, PropertyToken);
  let client = PropertyTokenClient::new(&env, &contract_id);

  // Initialize
  client.initialize(
    &admin,
    &String::from_str(&env, "Palermo Penthouse"),
    &String::from_str(&env, "PROP001"),
    &String::from_str(&env, "property-123"),
    &100_000,
    &100_000
  );

  // Mint
  client.mint(&user1, &1000);

  // Verify
  assert_eq!(client.balance(&user1), 1000);
}

#[test]
fn test_distribute_dividends() {
  // Setup...
  let distributed = client.distribute_dividends(&usdc_address, &10_000);

  // User1 tiene 1000/100000 tokens = 1% = 100 USDC
  assert_eq!(distributed.get(0).unwrap().1, 100);
}
```

#### 2.3 Deploy Pipeline

```bash
# Build
cargo build --target wasm32-unknown-unknown --release

# Optimize
soroban contract optimize \
  --wasm target/wasm32-unknown-unknown/release/property_token.wasm

# Deploy
CONTRACT_ID=$(soroban contract deploy \
  --wasm property_token_optimized.wasm \
  --source $ADMIN_SECRET \
  --network testnet)

echo "Deployed to: $CONTRACT_ID"

# Initialize
soroban contract invoke \
  --id $CONTRACT_ID \
  --source $ADMIN_SECRET \
  --network testnet \
  -- \
  initialize \
  --admin $ADMIN_PUBLIC \
  --name "Palermo Penthouse" \
  --symbol "PROP001" \
  --property_id "prop-123" \
  --valuation 100000 \
  --total_supply 100000
```

---

### Sprint 3: DEX Integration (Semana 5-6)

#### 3.1 Soroswap Integration

```javascript
// services/dex.js
import { SoroswapSDK } from '@soroswap/sdk';

const soroswap = new SoroswapSDK({
  network: Networks.TESTNET,
  rpcUrl: SOROBAN_RPC_URL
});

export async function getPropertyTokenPrice(assetAddress) {
  // Obtener quote de PROP001 a USDC
  const quote = await soroswap.quote({
    assetIn: assetAddress,  // PROP001
    assetOut: USDC_ADDRESS,
    amount: "1"  // Precio de 1 token
  });

  return parseFloat(quote.amountOut);  // USDC por token
}

export async function swapPropertyTokens(assetAddress, amount, userAddress) {
  const quote = await soroswap.quote({
    assetIn: assetAddress,
    assetOut: USDC_ADDRESS,
    amount: amount.toString()
  });

  const swapTx = await soroswap.swap({
    quote,
    userAddress,
    slippageTolerance: 0.05  // 5%
  });

  // Usuario firma con Freighter
  const signedXdr = await freighter.signTransaction(swapTx.xdr);

  // Submit
  const result = await soroswap.sendTransaction(signedXdr);
  return result;
}
```

#### 3.2 Liquidity Pools

```javascript
// Backend - Crear pool para nueva propiedad
async function createLiquidityPool(propertyAsset, initialUsdc) {
  const addLiquidityTx = await soroswap.addLiquidity({
    tokenA: propertyAsset.address,
    tokenB: USDC_ADDRESS,
    amountA: "1000",  // 1000 tokens
    amountB: initialUsdc,  // USDC equivalente
    userAddress: PLATFORM_ADMIN_ADDRESS
  });

  // Plataforma firma
  const signedXdr = await signWithAdmin(addLiquidityTx.xdr);

  // Submit
  await soroswap.sendTransaction(signedXdr);

  // Guardar pool address en DB
  await db.property.update({
    where: { assetCode: propertyAsset.code },
    data: { liquidityPoolAddress: pool.address }
  });
}
```

---

### Sprint 4: Admin Panel (Semana 7-8)

#### 4.1 Admin Dashboard

```javascript
// pages/admin/Dashboard.jsx

export function AdminDashboard() {
  const { data: stats } = useQuery(['admin-stats'], fetchAdminStats);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Properties" value={stats.totalProperties} />
        <StatCard title="Total Volume" value={`$${stats.totalVolume}`} />
        <StatCard title="Active Users" value={stats.activeUsers} />
        <StatCard title="Revenue (30d)" value={`$${stats.revenue30d}`} />
      </div>

      {/* Pending Approvals */}
      <PendingPropertiesTable />

      {/* Recent Transactions */}
      <TransactionsTable />
    </div>
  );
}
```

#### 4.2 Property Approval Flow

```javascript
// Backend
POST /api/admin/properties/:id/approve

async function approveProperty(req, res) {
  const { id } = req.params;
  const { adminId } = req.user;

  // Verificar que admin tenga permisos
  if (!isAdmin(adminId)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Actualizar status
  const property = await db.property.update({
    where: { id },
    data: {
      status: 'approved',
      approved_by: adminId,
      approved_at: new Date()
    }
  });

  // Notificar a owner
  await sendEmail({
    to: property.owner.email,
    subject: '¡Tu propiedad fue aprobada!',
    template: 'property-approved',
    data: { property }
  });

  res.json({ success: true, property });
}
```

---

## 🧪 FASE 3: PILOTO CON PROPIEDADES REALES

### Duración: **6 meses**
### Objetivo: **10 propiedades reales tokenizadas**

---

### Milestone 1: Legal Framework (Mes 1-2)

#### 1.1 Partnerships Legales

```markdown
□ Contratar abogado especializado en blockchain LATAM
□ Redactar Terms & Conditions específicos
□ Crear Privacy Policy (ZK-KYC focused)
□ Investment Disclaimers (no garantía de retorno)
□ Partnership agreements con escribanos
```

#### 1.2 Due Diligence Process

```markdown
Checklist por Propiedad:
□ Verificar título de propiedad (escritura)
□ Confirmar ausencia de gravámenes
□ Tasación profesional (3ra party)
□ Inspección física del inmueble
□ Verificar identity del propietario (KYC propietario)
□ Firmar contrato legal binding
```

---

### Milestone 2: ZK-KYC Real (Mes 3-4)

#### 2.1 Implementación zk-SNARKs Real

**Instalar Dependencias:**
```bash
npm install snarkjs circomlib
```

**Definir Circuit (Circom):**
```circom
// circuits/kyc_verification.circom

pragma circom 2.0.0;

template KYCVerification() {
  // Private inputs
  signal input age;
  signal input countryCode;  // 1=ARG, 2=BRA, etc.
  signal input verified;

  // Public outputs
  signal output isOver18;
  signal output isLATAM;
  signal output isVerified;

  // Age check
  component ageCheck = GreaterEqThan(7);  // 7 bits = max 127
  ageCheck.in[0] <== age;
  ageCheck.in[1] <== 18;
  isOver18 <== ageCheck.out;

  // LATAM check (country 1-6)
  component latamCheck = LessThan(4);
  latamCheck.in[0] <== countryCode;
  latamCheck.in[1] <== 7;  // Countries 1-6 son LATAM
  isLATAM <== latamCheck.out;

  // Verified check
  isVerified <== verified;
}

component main = KYCVerification();
```

**Generar Proving/Verification Keys:**
```bash
# Compile circuit
circom kyc_verification.circom --r1cs --wasm --sym

# Powers of Tau ceremony (trusted setup)
snarkjs powersoftau new bn128 12 pot12_0000.ptau
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau

# Generate proving key
snarkjs groth16 setup kyc_verification.r1cs pot12_0001.ptau kyc_0000.zkey
snarkjs zkey contribute kyc_0000.zkey kyc_0001.zkey

# Export verification key
snarkjs zkey export verificationkey kyc_0001.zkey verification_key.json
```

**Generar Proof en Frontend:**
```javascript
// services/zkKYC.js (REAL implementation)
import { groth16 } from 'snarkjs';

export async function generateKYCProof(age, country, verified) {
  // Map country string to code
  const countryMap = {
    'Argentina': 1, 'Brasil': 2, 'Chile': 3,
    'Colombia': 4, 'México': 5, 'Perú': 6
  };

  const input = {
    age: age,
    countryCode: countryMap[country],
    verified: verified ? 1 : 0
  };

  // Generate proof (computación en navegador)
  const { proof, publicSignals } = await groth16.fullProve(
    input,
    '/circuits/kyc_verification.wasm',
    '/circuits/kyc_0001.zkey'
  );

  return {
    proof: JSON.stringify(proof),
    publicSignals,
    verificationKey: '/circuits/verification_key.json'
  };
}

export async function verifyKYCProof(zkProof) {
  const vKey = await fetch(zkProof.verificationKey).then(r => r.json());

  const isValid = await groth16.verify(
    vKey,
    zkProof.publicSignals,
    JSON.parse(zkProof.proof)
  );

  return isValid;
}
```

---

### Milestone 3: Onboarding Propiedades (Mes 5-6)

#### 3.1 Primeras 10 Propiedades

**Target Properties:**
```markdown
Buenos Aires (3):
- Departamento Palermo 2 amb ($80K)
- Penthouse Recoleta 4 amb ($200K)
- PH Villa Crespo 3 amb ($120K)

Santiago (2):
- Apartment Providencia ($90K)
- House Las Condes ($180K)

Medellín (2):
- Apartment Poblado ($70K)
- Penthouse Laureles ($110K)

Lima (2):
- Apartment Miraflores ($85K)
- House San Isidro ($150K)

São Paulo (1):
- Apartment Vila Madalena ($95K)
```

#### 3.2 Marketing Campaign

```markdown
□ Landing page optimizada SEO
□ Blog posts educativos (qué es tokenización)
□ Webinars con escribanos/inversores
□ Partnerships con inmobiliarias
□ Ads en Google/Facebook (target: LATAM investors)
□ PR en medios cripto (CoinDesk LATAM, etc.)
```

---

## 🚀 FASE 4: PRODUCCIÓN MAINNET

### Duración: **12+ meses**
### Objetivo: **100+ propiedades, 1000+ usuarios**

---

### Q1: Mainnet Migration

```bash
□ Migrar contratos a Stellar Mainnet
□ Update RPC URLs a mainnet
□ Crear issuer/distributor addresses reales
□ Funding con XLM real
□ Deploy smart contracts auditados
□ Configurar monitoring 24/7
```

### Q2: Expansion

```markdown
□ Agregar más países LATAM (Uruguay, Paraguay, Ecuador)
□ Multi-idioma (Español, Portugués, Inglés)
□ Mobile app (React Native)
□ API pública para integradores
□ Marketplace secundario completo
```

### Q3: Advanced Features

```markdown
□ Fractional NFTs (para propiedades únicas)
□ Yield farming con LP tokens
□ Governance token ($BLOCKI)
□ DAO para decisiones de plataforma
□ Insurance protocol (protect investors)
```

### Q4: Scale

```markdown
□ 500+ propiedades
□ $10M+ en volumen
□ Partnerships institucionales (fondos de inversión)
□ Expansion a otros activos (autos, arte, etc.)
```

---

## 📊 MÉTRICAS DE ÉXITO

### Fase 1 (Hackathon):
- ✅ Demo funcional end-to-end
- ✅ Presentación impactante
- 🎯 Ganar hackathon

### Fase 2 (Post-Hackathon):
- 📈 Backend API completo (100% endpoints)
- 📈 Smart contracts auditados (0 vulnerabilidades)
- 📈 10 beta testers activos

### Fase 3 (Piloto):
- 📈 10 propiedades tokenizadas
- 📈 $1M+ en valor total tokenizado
- 📈 100 usuarios registrados
- 📈 50 inversiones completadas

### Fase 4 (Producción):
- 📈 100+ propiedades
- 📈 $10M+ en volumen
- 📈 1000+ usuarios
- 📈 Revenue: $50K+/mes

---

## 🔧 HERRAMIENTAS & TECNOLOGÍAS

### Desarrollo:
- **IDEs:** VS Code con extensiones Rust/Solidity
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Testing:** Jest, Vitest, Rust tests

### Blockchain:
- **Soroban CLI:** Para deploy de contratos
- **Stellar Laboratory:** Testing transacciones
- **Stellar Expert:** Block explorer
- **Freighter:** Wallet testing

### Backend:
- **ORM:** Prisma
- **Queue:** Bull + Redis (para jobs)
- **Cron:** node-cron (para tasks recurrentes)
- **Logging:** Winston + Sentry

### DevOps:
- **Hosting:** Vercel (frontend), Railway (backend)
- **Database:** PostgreSQL (Supabase/Railway)
- **File Storage:** AWS S3 / Cloudinary
- **Monitoring:** DataDog / New Relic
- **Alerts:** PagerDuty

---

## 📝 CHECKLIST SEMANAL

### Cada Lunes:
```markdown
□ Review roadmap progress
□ Update GitHub Projects
□ Team standup (si hay equipo)
□ Priorizar tareas de la semana
```

### Cada Viernes:
```markdown
□ Deploy a staging
□ Smoke tests
□ Update documentación si hubo cambios
□ Retrospectiva: qué funcionó, qué mejorar
```

---

## 🎯 PRÓXIMOS 7 DÍAS (ACCIÓN INMEDIATA)

```markdown
PRIORIDAD ALTA:
□ [1h] Compilar PropertyToken contract en Rust
□ [2h] Deploy contract a Soroban testnet
□ [1h] Crear PROP001 y PROP002 en testnet
□ [2h] Integrar SAC address en frontend
□ [2h] Test end-to-end: wallet → buy tokens
□ [1h] Fix bugs encontrados
□ [2h] Preparar slides pitch
□ [1h] Practicar presentación

Total: ~12 horas de trabajo
```

---

*Este roadmap es vivo y debe actualizarse cada sprint* 🗺️

---

**¿SIGUIENTE PASO?**

Ejecutar "PRÓXIMOS 7 DÍAS" para tener demo sólida para el hackathon 🚀
