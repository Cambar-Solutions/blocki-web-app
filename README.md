# Blocki Web App

Frontend web application for the Blocki platform - A Stellar-based real estate tokenization platform that enables fractional ownership of properties through blockchain technology.

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: TailwindCSS 4.1
- **State Management**: TanStack Query (React Query) v5
- **Routing**: React Router DOM v7
- **Blockchain**:
  - @stellar/stellar-sdk v14.3.2 (Soroban RPC)
  - @stellar/freighter-api (Wallet integration)
- **HTTP Client**: Axios
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: lucide-react
- **Notifications**: react-hot-toast

## Features

### Implemented

- Wallet Integration (Freighter)
  - Connect/disconnect wallet
  - Network detection (Testnet/Mainnet)
  - Transaction signing
  - Auto-reconnect

- Properties Management
  - Browse properties
  - View property details
  - Filter by status (tokenized, verified, pending)
  - Property cards with images and metadata

- Marketplace
  - Browse active listings
  - Market statistics dashboard
  - Listing cards with pricing
  - Filter by status

- Dashboard
  - Portfolio overview
  - My properties
  - My investments
  - Recent transactions
  - Wallet status

- Infrastructure
  - Soroban RPC integration (NOT Horizon)
  - Backend API client with interceptors
  - Custom hooks for data fetching
  - Error boundaries
  - Loading states
  - Responsive design
  - Protected routes

### To Be Implemented

- Property Detail Page
- Create Property Flow
- Tokenization Flow
- Listing Detail Page
- Buy/Sell Modals
- KYC Verification
- Portfolio Page
- Transaction History

## Project Structure

```
blocki-web-app/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── wallet/          # Wallet components
│   │   └── properties/      # Property-specific components
│   ├── hooks/               # Custom React hooks
│   │   ├── useWallet.ts
│   │   ├── useAuth.ts
│   │   ├── useProperties.ts
│   │   ├── useMarketplace.ts
│   │   └── useUser.ts
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── PropertiesList.tsx
│   │   └── MarketplaceHome.tsx
│   ├── services/            # External services
│   │   ├── soroban.ts       # Soroban RPC client
│   │   └── api.ts           # Backend API client
│   ├── types/               # TypeScript types
│   │   ├── property.ts
│   │   ├── marketplace.ts
│   │   ├── user.ts
│   │   └── stellar.ts
│   ├── lib/                 # Utilities
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── .env.example             # Environment variables template
├── .env.local               # Local environment variables
└── package.json
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Backend API
VITE_API_URL=http://localhost:3000

# Stellar Network Configuration
VITE_STELLAR_NETWORK=testnet
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Contract IDs (populate after smart contract deployment)
VITE_PROPERTY_TOKEN_DEPLOYER_ID=
VITE_MARKETPLACE_CONTRACT_ID=
VITE_ESCROW_CONTRACT_ID=
VITE_REGISTRY_CONTRACT_ID=

# Freighter Wallet
VITE_FREIGHTER_ENABLED=true

# GraphQL Indexer
VITE_GRAPHQL_URL=http://localhost:3000/graphql

# Feature Flags
VITE_ENABLE_KYC=true
VITE_ENABLE_FIAT_CONVERSION=true
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Freighter Wallet extension installed in your browser
- Backend API running (see `service-blocki/`)
- Smart Contracts deployed (see `contracts/`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
npm run lint
```

## Important Notes

### Soroban RPC vs Horizon

**CRITICAL**: This app uses Soroban RPC for smart contract interactions, NOT Horizon API.

- `src/services/soroban.ts` - Correct implementation
- ~~`src/services/stellar.ts`~~ - Old file (Horizon-based, not used)

### Freighter Wallet

To interact with Soroban contracts, ensure:
1. Freighter extension is installed
2. "Experimental Mode" is enabled in Freighter settings
3. You're connected to the correct network (Testnet/Mainnet)

### Backend Integration

The app expects the following backend endpoints:

**Auth**:
- POST `/auth/challenge` - Get auth challenge
- POST `/auth/verify` - Verify signature
- GET `/auth/profile` - Get user profile

**Properties**:
- GET `/properties` - List properties
- GET `/properties/:id` - Get property details
- POST `/properties` - Create property
- POST `/properties/:id/tokenize` - Tokenize property
- GET `/properties/:id/ownership` - Get ownership details

**Marketplace**:
- GET `/marketplace/listings` - List marketplace listings
- POST `/marketplace/listings` - Create listing
- POST `/marketplace/buy` - Buy tokens
- GET `/marketplace/stats` - Market statistics

**Users**:
- GET `/users/me` - Get current user
- GET `/users/portfolio` - Get portfolio
- POST `/users/kyc/initiate` - Start KYC verification

## Dependencies with Backend

This frontend requires:
1. **Backend API** (`service-blocki/`) running on port 3000
2. **Smart Contracts** deployed with Contract IDs configured
3. **Indexer** (optional but recommended for historical data)

## Development Workflow

1. Ensure backend is running
2. Start dev server: `npm run dev`
3. Connect Freighter wallet
4. Switch to Testnet in Freighter
5. Navigate to Dashboard to see your portfolio

## Browser Support

- Chrome/Edge (recommended with Freighter)
- Firefox (with Freighter)
- Safari (limited - Freighter not available)

## Known Issues

- Bundle size warning (1.3MB JS) - Consider code splitting in future
- Freighter wallet sometimes requires page refresh
- Network switching may require reconnection

## Contributing

1. Create feature branch
2. Make changes
3. Test build: `npm run build`
4. Test dev server: `npm run dev`
5. Create PR

## License

Private - Blocki Platform

## Contact

For questions or issues, contact the development team.
