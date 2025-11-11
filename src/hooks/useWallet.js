import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Hook to manage wallet connection (Freighter wallet)
 * Install Freighter extension: https://www.freighter.app/
 */
export function useWallet() {
  const [publicKey, setPublicKey] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if Freighter is installed
  const isFreighterInstalled = () => {
    return typeof window !== 'undefined' && window.freighter;
  };

  // Connect to Freighter wallet
  const connect = async () => {
    if (!isFreighterInstalled()) {
      toast.error('Freighter wallet is not installed. Please install it first.');
      window.open('https://www.freighter.app/', '_blank');
      return;
    }

    setLoading(true);
    try {
      const { publicKey: pk } = await window.freighter.getPublicKey();
      setPublicKey(pk);
      setConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setPublicKey(null);
    setConnected(false);
    toast.success('Wallet disconnected');
  };

  // Sign a transaction with Freighter
  const signTransaction = async (xdr, network = 'TESTNET') => {
    if (!isFreighterInstalled()) {
      toast.error('Freighter wallet is not installed');
      return null;
    }

    try {
      const signedXdr = await window.freighter.signTransaction(xdr, network);
      return signedXdr;
    } catch (error) {
      console.error('Error signing transaction:', error);
      toast.error('Failed to sign transaction');
      return null;
    }
  };

  // Check connection on mount
  useEffect(() => {
    if (isFreighterInstalled()) {
      window.freighter.getPublicKey()
        .then(({ publicKey: pk }) => {
          setPublicKey(pk);
          setConnected(true);
        })
        .catch(() => {
          // User hasn't connected yet
        });
    }
  }, []);

  return {
    publicKey,
    connected,
    loading,
    connect,
    disconnect,
    signTransaction,
    isFreighterInstalled: isFreighterInstalled(),
  };
}
