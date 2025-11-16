import * as StellarSdk from '@stellar/stellar-sdk'

const HORIZON_URL = import.meta.env.VITE_STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org'
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET

const server = new StellarSdk.Horizon.Server(HORIZON_URL)

export const stellarService = {
  // Get account details
  getAccount: async (publicKey) => {
    try {
      const account = await server.loadAccount(publicKey)
      return account
    } catch (error) {
      console.error('Error loading account:', error)
      throw error
    }
  },

  // Get account balances
  getBalances: async (publicKey) => {
    try {
      const account = await stellarService.getAccount(publicKey)
      return account.balances
    } catch (error) {
      console.error('Error loading balances:', error)
      throw error
    }
  },

  // Build payment transaction
  buildPaymentTransaction: async (sourcePublicKey, destinationPublicKey, amount) => {
    try {
      const sourceAccount = await server.loadAccount(sourcePublicKey)

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(180)
        .build()

      return transaction.toXDR()
    } catch (error) {
      console.error('Error building transaction:', error)
      throw error
    }
  },

  // Submit signed transaction
  submitTransaction: async (signedXdr) => {
    try {
      const transaction = StellarSdk.TransactionBuilder.fromXDR(
        signedXdr,
        NETWORK_PASSPHRASE
      )
      const result = await server.submitTransaction(transaction)
      return result
    } catch (error) {
      console.error('Error submitting transaction:', error)
      throw error
    }
  },

  // Get transaction history
  getTransactions: async (publicKey, limit = 10) => {
    try {
      const transactions = await server
        .transactions()
        .forAccount(publicKey)
        .limit(limit)
        .order('desc')
        .call()
      return transactions.records
    } catch (error) {
      console.error('Error loading transactions:', error)
      throw error
    }
  },

  // Fund testnet account
  fundTestnetAccount: async (publicKey) => {
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
      )
      return await response.json()
    } catch (error) {
      console.error('Error funding account:', error)
      throw error
    }
  },
}
