// Network configuration constants
export const STELLAR_NETWORK = import.meta.env.VITE_STELLAR_NETWORK || 'testnet';
export const SOROBAN_RPC_URL = import.meta.env.VITE_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org:443';
export const NETWORK_PASSPHRASE = import.meta.env.VITE_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015';

// Backend API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql';

// Contract IDs (will be populated after deployment)
export const CONTRACT_IDS = {
  PROPERTY_TOKEN_DEPLOYER: import.meta.env.VITE_PROPERTY_TOKEN_DEPLOYER_ID || '',
  MARKETPLACE: import.meta.env.VITE_MARKETPLACE_CONTRACT_ID || '',
  ESCROW: import.meta.env.VITE_ESCROW_CONTRACT_ID || '',
  REGISTRY: import.meta.env.VITE_REGISTRY_CONTRACT_ID || '',
} as const;

// Feature flags
export const FEATURES = {
  KYC_ENABLED: import.meta.env.VITE_ENABLE_KYC === 'true',
  FIAT_CONVERSION_ENABLED: import.meta.env.VITE_ENABLE_FIAT_CONVERSION === 'true',
} as const;

// Transaction settings
export const TX_SETTINGS = {
  BASE_FEE: '100',
  TIMEOUT: 180, // seconds
} as const;

// Freighter wallet settings
export const FREIGHTER_SETTINGS = {
  ENABLED: import.meta.env.VITE_FREIGHTER_ENABLED === 'true',
  NETWORK: STELLAR_NETWORK.toUpperCase() as 'TESTNET' | 'PUBLIC',
} as const;
