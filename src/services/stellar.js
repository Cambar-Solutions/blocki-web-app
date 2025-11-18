import * as StellarSdk from '@stellar/stellar-sdk';

// Network configuration
export const NETWORKS = {
  testnet: {
    networkPassphrase: StellarSdk.Networks.TESTNET,
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
  },
  mainnet: {
    networkPassphrase: StellarSdk.Networks.PUBLIC,
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://soroban-mainnet.stellar.org',
  },
};

// Default to testnet for development
const currentNetwork = NETWORKS.testnet;

// Initialize Horizon Server
export const server = new StellarSdk.Horizon.Server(currentNetwork.horizonUrl);

// Initialize Soroban RPC Server
// Note: Soroban RPC may require different import in SDK v14+
// Uncomment when needed for smart contract interactions
// export const sorobanServer = new StellarSdk.SorobanRpc.Server(
//   currentNetwork.sorobanRpcUrl
// );

/**
 * Get account details from the network
 * @param {string} publicKey
 * @returns {Promise<StellarSdk.Horizon.AccountResponse>}
 */
export async function getAccount(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);
    return account;
  } catch (error) {
    console.error('Error loading account:', error);
    throw error;
  }
}

/**
 * Get account balance
 * @param {string} publicKey
 * @returns {Promise<StellarSdk.Horizon.HorizonApi.BalanceLine[]>}
 */
export async function getAccountBalance(publicKey) {
  try {
    const account = await getAccount(publicKey);
    return account.balances;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}

/**
 * Create a basic payment transaction
 * @param {string} sourcePublicKey
 * @param {string} destinationPublicKey
 * @param {string} amount
 * @param {StellarSdk.Asset} [asset]
 * @returns {Promise<StellarSdk.Transaction>}
 */
export async function createPaymentTransaction(
  sourcePublicKey,
  destinationPublicKey,
  amount,
  asset = StellarSdk.Asset.native()
) {
  try {
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: currentNetwork.networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: asset,
          amount: amount,
        })
      )
      .setTimeout(180)
      .build();

    return transaction;
  } catch (error) {
    console.error('Error creating payment transaction:', error);
    throw error;
  }
}

/**
 * Submit a signed transaction to the network
 * @param {StellarSdk.Transaction} transaction
 * @returns {Promise<StellarSdk.Horizon.HorizonApi.SubmitTransactionResponse>}
 */
export async function submitTransaction(transaction) {
  try {
    const result = await server.submitTransaction(transaction);
    return result;
  } catch (error) {
    console.error('Error submitting transaction:', error);
    throw error;
  }
}

/**
 * Generate a new keypair
 * @returns {StellarSdk.Keypair}
 */
export function generateKeypair() {
  return StellarSdk.Keypair.random();
}

/**
 * Fund account on testnet (only works on testnet)
 * @param {string} publicKey
 * @returns {Promise<any>}
 */
export async function fundTestnetAccount(publicKey) {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.error('Error funding testnet account:', error);
    throw error;
  }
}

export { StellarSdk };
