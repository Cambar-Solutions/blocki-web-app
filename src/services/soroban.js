import {
  SorobanRpc,
  Contract,
  TransactionBuilder,
  BASE_FEE,
  Networks,
  xdr
} from '@stellar/stellar-sdk';
import { SOROBAN_RPC_URL, NETWORK_PASSPHRASE, STELLAR_NETWORK } from '../lib/constants';

// Network configuration (CORRECT for Soroban)
export const NETWORKS = {
  testnet: {
    networkPassphrase: Networks.TESTNET,
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org:443',
  },
  mainnet: {
    networkPassphrase: Networks.PUBLIC,
    sorobanRpcUrl: 'https://mainnet.sorobanrpc.com',
  },
};

const currentNetwork = NETWORKS[STELLAR_NETWORK] || NETWORKS.testnet;

// Initialize Soroban RPC Server (NOT Horizon!)
export const sorobanServer = new SorobanRpc.Server(SOROBAN_RPC_URL || currentNetwork.sorobanRpcUrl);

/**
 * Get account from Soroban RPC
 * @param {string} publicKey
 * @returns {Promise<import('@stellar/stellar-sdk').Account>}
 */
export async function getAccount(publicKey) {
  try {
    const account = await sorobanServer.getAccount(publicKey);
    return account;
  } catch (error) {
    console.error('Error loading account:', error);
    throw new Error(`Failed to load account: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Simulate transaction before sending
 * @param {import('@stellar/stellar-sdk').Transaction} transaction
 * @returns {Promise<import('@stellar/stellar-sdk').SorobanRpc.Api.SimulateTransactionResponse>}
 */
export async function simulateTransaction(transaction) {
  try {
    const simulation = await sorobanServer.simulateTransaction(transaction);

    if (SorobanRpc.Api.isSimulationError(simulation)) {
      throw new Error(`Simulation failed: ${simulation.error}`);
    }

    return simulation;
  } catch (error) {
    console.error('Error simulating transaction:', error);
    throw error;
  }
}

/**
 * Prepare transaction (simulate + assemble)
 * @param {import('@stellar/stellar-sdk').Transaction} transaction
 * @returns {Promise<import('@stellar/stellar-sdk').Transaction>}
 */
export async function prepareTransaction(transaction) {
  try {
    const simulation = await simulateTransaction(transaction);

    if (SorobanRpc.Api.isSimulationSuccess(simulation)) {
      return SorobanRpc.assembleTransaction(transaction, simulation).build();
    }

    throw new Error('Transaction simulation was not successful');
  } catch (error) {
    console.error('Error preparing transaction:', error);
    throw error;
  }
}

/**
 * Submit transaction to Soroban
 * @param {string} signedXdr
 * @returns {Promise<import('@stellar/stellar-sdk').SorobanRpc.Api.GetTransactionResponse>}
 */
export async function submitTransaction(signedXdr) {
  try {
    const tx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
    const response = await sorobanServer.sendTransaction(tx);

    if (response.status === 'ERROR') {
      throw new Error(`Transaction submission failed: ${response.errorResult?.toXDR('base64')}`);
    }

    // Poll for result
    let getResponse = await sorobanServer.getTransaction(response.hash);
    let attempts = 0;
    const maxAttempts = 30;

    while (getResponse.status === SorobanRpc.Api.GetTransactionStatus.NOT_FOUND && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await sorobanServer.getTransaction(response.hash);
      attempts++;
    }

    if (getResponse.status === SorobanRpc.Api.GetTransactionStatus.SUCCESS) {
      return getResponse;
    } else if (getResponse.status === SorobanRpc.Api.GetTransactionStatus.FAILED) {
      throw new Error(`Transaction failed: ${getResponse.resultXdr?.toXDR('base64')}`);
    } else {
      throw new Error(`Transaction timed out after ${maxAttempts} attempts`);
    }
  } catch (error) {
    console.error('Error submitting transaction:', error);
    throw error;
  }
}

/**
 * Get contract events
 * @param {string} contractId
 * @param {number} startLedger
 * @param {import('@stellar/stellar-sdk').SorobanRpc.Api.EventFilter[]} [filters]
 * @returns {Promise<import('@stellar/stellar-sdk').SorobanRpc.Api.GetEventsResponse>}
 */
export async function getContractEvents(contractId, startLedger, filters) {
  try {
    const events = await sorobanServer.getEvents({
      startLedger,
      filters: filters || [
        {
          type: 'contract',
          contractIds: [contractId],
        },
      ],
    });
    return events;
  } catch (error) {
    console.error('Error getting contract events:', error);
    throw error;
  }
}

/**
 * Get latest ledger
 * @returns {Promise<number>}
 */
export async function getLatestLedger() {
  try {
    const latestLedger = await sorobanServer.getLatestLedger();
    return latestLedger.sequence;
  } catch (error) {
    console.error('Error getting latest ledger:', error);
    throw error;
  }
}

/**
 * Health check
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const health = await sorobanServer.getHealth();
    return health.status === 'healthy';
  } catch (error) {
    console.error('Error checking health:', error);
    return false;
  }
}

/**
 * Get contract data
 * @param {string} contractId
 * @returns {Promise<import('@stellar/stellar-sdk').SorobanRpc.Api.LedgerEntryResult>}
 */
export async function getContractData(contractId) {
  try {
    const contractKey = xdr.LedgerKey.contractData(
      new xdr.LedgerKeyContractData({
        contract: Contract.contractAddress(contractId),
        key: xdr.ScVal.scvLedgerKeyContractInstance(),
        durability: xdr.ContractDataDurability.persistent(),
      })
    );

    const response = await sorobanServer.getLedgerEntries(contractKey);

    if (!response.entries || response.entries.length === 0) {
      throw new Error('Contract data not found');
    }

    return response.entries[0];
  } catch (error) {
    console.error('Error getting contract data:', error);
    throw error;
  }
}

/**
 * Create contract instance
 * @param {string} contractId
 * @returns {Contract}
 */
export function createContract(contractId) {
  return new Contract(contractId);
}
