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

  // Create property token (asset)
  createPropertyToken: async (issuerPublicKey, assetCode) => {
    try {
      const issuerAccount = await server.loadAccount(issuerPublicKey)

      const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          StellarSdk.Operation.setOptions({
            homeDomain: 'blocki.app',
          })
        )
        .setTimeout(180)
        .build()

      return transaction.toXDR()
    } catch (error) {
      console.error('Error creating token:', error)
      throw error
    }
  },

  // Build trustline transaction (buyer must trust the property token)
  buildTrustlineTransaction: async (buyerPublicKey, issuerPublicKey, assetCode) => {
    try {
      const buyerAccount = await server.loadAccount(buyerPublicKey)
      const asset = new StellarSdk.Asset(assetCode, issuerPublicKey)

      const transaction = new StellarSdk.TransactionBuilder(buyerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: asset,
            limit: '10000000', // Max tokens buyer can hold
          })
        )
        .setTimeout(180)
        .build()

      return transaction.toXDR()
    } catch (error) {
      console.error('Error building trustline:', error)
      throw error
    }
  },

  // Build token purchase transaction (property tokens + XLM payment)
  buildTokenPurchaseTransaction: async (
    buyerPublicKey,
    issuerPublicKey,
    platformPublicKey,
    assetCode,
    tokenAmount,
    xlmPrice
  ) => {
    try {
      const buyerAccount = await server.loadAccount(buyerPublicKey)
      const propertyAsset = new StellarSdk.Asset(assetCode, issuerPublicKey)

      const transaction = new StellarSdk.TransactionBuilder(buyerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        // Payment 1: Buyer pays platform in XLM
        .addOperation(
          StellarSdk.Operation.payment({
            destination: platformPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: xlmPrice.toString(),
          })
        )
        // Payment 2: Platform sends property tokens to buyer
        .addMemo(StellarSdk.Memo.text(`BLOCKI:${assetCode}:${tokenAmount}`))
        .setTimeout(180)
        .build()

      return transaction.toXDR()
    } catch (error) {
      console.error('Error building purchase transaction:', error)
      throw error
    }
  },

  // Send property tokens from issuer to buyer
  sendPropertyTokens: async (issuerPublicKey, buyerPublicKey, assetCode, amount) => {
    try {
      const issuerAccount = await server.loadAccount(issuerPublicKey)
      const asset = new StellarSdk.Asset(assetCode, issuerPublicKey)

      const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: buyerPublicKey,
            asset: asset,
            amount: amount.toString(),
          })
        )
        .setTimeout(180)
        .build()

      return transaction.toXDR()
    } catch (error) {
      console.error('Error sending tokens:', error)
      throw error
    }
  },

  // Get asset holders (for property token distribution tracking)
  getAssetHolders: async (assetCode, issuerPublicKey) => {
    try {
      const asset = new StellarSdk.Asset(assetCode, issuerPublicKey)
      const accounts = await server.accounts().forAsset(asset).call()
      return accounts.records
    } catch (error) {
      console.error('Error getting asset holders:', error)
      throw error
    }
  },

  // Convert MXN to XLM (simplified - in production use price oracle)
  convertMxnToXlm: (mxnAmount) => {
    // Simplified conversion rate (in production, fetch from oracle)
    const XLM_TO_USD = 0.12 // $0.12 USD per XLM
    const USD_TO_MXN = 18.5 // ~18.5 MXN per USD
    const XLM_TO_MXN = XLM_TO_USD * USD_TO_MXN // ~2.22 MXN per XLM
    return (mxnAmount / XLM_TO_MXN).toFixed(7)
  },
}
