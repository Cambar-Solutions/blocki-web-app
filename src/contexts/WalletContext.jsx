import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [publicKey, setPublicKey] = useState(null)
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false)

  useEffect(() => {
    checkFreighter()
  }, [])

  const checkFreighter = () => {
    const installed = typeof window.freighter !== 'undefined'
    setIsFreighterInstalled(installed)
    return installed
  }

  const connect = async () => {
    if (!checkFreighter()) {
      toast.error('Freighter wallet no está instalado')
      window.open('https://www.freighter.app/', '_blank')
      return { success: false }
    }

    setLoading(true)
    try {
      const key = await window.freighter.getPublicKey()
      setPublicKey(key)
      setConnected(true)
      localStorage.setItem('blocki_wallet', key)
      toast.success('Wallet conectada exitosamente')
      return { success: true, publicKey: key }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      toast.error('Error al conectar wallet')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const disconnect = () => {
    setPublicKey(null)
    setConnected(false)
    localStorage.removeItem('blocki_wallet')
    toast.success('Wallet desconectada')
  }

  const signTransaction = async (xdr) => {
    if (!connected) {
      toast.error('Por favor conecta tu wallet primero')
      return { success: false }
    }

    try {
      const signedXdr = await window.freighter.signTransaction(xdr, {
        networkPassphrase: 'Test SDF Network ; September 2015',
      })
      return { success: true, signedXdr }
    } catch (error) {
      console.error('Failed to sign transaction:', error)
      toast.error('Error al firmar transacción')
      return { success: false, error: error.message }
    }
  }

  // Auto-reconnect on mount if wallet was previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('blocki_wallet')
    if (savedWallet && checkFreighter()) {
      setPublicKey(savedWallet)
      setConnected(true)
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        connected,
        loading,
        isFreighterInstalled,
        connect,
        disconnect,
        signTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}
