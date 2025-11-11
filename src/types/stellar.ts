export interface WalletState {
  publicKey: string | null;
  connected: boolean;
  network: 'testnet' | 'mainnet';
}

export interface Balance {
  balance: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}

export interface TransactionResult {
  successful: boolean;
  hash: string;
  ledger: number;
  error?: string;
}

export interface NetworkConfig {
  networkPassphrase: string;
  horizonUrl: string;
  sorobanRpcUrl: string;
}
