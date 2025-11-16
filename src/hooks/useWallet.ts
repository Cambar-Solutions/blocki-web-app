import { useState, useEffect, useCallback } from 'react';
import { isConnected, getPublicKey, signTransaction, getNetwork } from '@stellar/freighter-api';
import { toast } from 'react-hot-toast';
import { FREIGHTER_SETTINGS, NETWORK_PASSPHRASE } from '../lib/constants';

interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  network: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isLoading: true,
    error: null,
    network: null,
  });

  const checkConnection = useCallback(async () => {
    if (!FREIGHTER_SETTINGS.ENABLED) {
      setState({
        publicKey: null,
        isConnected: false,
        isLoading: false,
        error: 'Freighter wallet is disabled',
        network: null,
      });
      return;
    }

    try {
      const connected = await isConnected();

      if (connected) {
        const publicKey = await getPublicKey();
        const network = await getNetwork();

        // Verify we're on the correct network
        if (network !== FREIGHTER_SETTINGS.NETWORK) {
          toast.error(
            `Please switch Freighter to ${FREIGHTER_SETTINGS.NETWORK} network`
          );
          setState({
            publicKey: null,
            isConnected: false,
            isLoading: false,
            error: `Wrong network. Expected ${FREIGHTER_SETTINGS.NETWORK}, got ${network}`,
            network,
          });
          return;
        }

        setState({
          publicKey,
          isConnected: true,
          isLoading: false,
          error: null,
          network,
        });
      } else {
        setState({
          publicKey: null,
          isConnected: false,
          isLoading: false,
          error: null,
          network: null,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to connect wallet';

      setState({
        publicKey: null,
        isConnected: false,
        isLoading: false,
        error: errorMessage,
        network: null,
      });

      // Only show error if user explicitly tried to connect
      if (state.isConnected) {
        toast.error(errorMessage);
      }
    }
  }, [state.isConnected]);

  const connect = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Request access to Freighter
      const publicKey = await getPublicKey();
      const network = await getNetwork();

      // Verify network
      if (network !== FREIGHTER_SETTINGS.NETWORK) {
        throw new Error(
          `Please switch Freighter to ${FREIGHTER_SETTINGS.NETWORK} network`
        );
      }

      setState({
        publicKey,
        isConnected: true,
        isLoading: false,
        error: null,
        network,
      });

      toast.success('Wallet connected successfully');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to connect wallet';

      setState({
        publicKey: null,
        isConnected: false,
        isLoading: false,
        error: errorMessage,
        network: null,
      });

      toast.error(errorMessage);
      throw error;
    }
  };

  const disconnect = () => {
    setState({
      publicKey: null,
      isConnected: false,
      isLoading: false,
      error: null,
      network: null,
    });
    toast.success('Wallet disconnected');
  };

  const signTx = async (xdr: string): Promise<string> => {
    if (!state.isConnected || !state.publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const signedXdr = await signTransaction(xdr, {
        networkPassphrase: NETWORK_PASSPHRASE,
        network: FREIGHTER_SETTINGS.NETWORK,
      });

      return signedXdr;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to sign transaction';

      toast.error(errorMessage);
      throw new Error(`Transaction signing failed: ${errorMessage}`);
    }
  };

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Listen for Freighter events
  useEffect(() => {
    if (!FREIGHTER_SETTINGS.ENABLED) return;

    const handleAccountChange = () => {
      checkConnection();
    };

    const handleNetworkChange = () => {
      checkConnection();
    };

    // Freighter emits these events when user changes account/network
    window.addEventListener('freighter-account-changed', handleAccountChange);
    window.addEventListener('freighter-network-changed', handleNetworkChange);

    return () => {
      window.removeEventListener('freighter-account-changed', handleAccountChange);
      window.removeEventListener('freighter-network-changed', handleNetworkChange);
    };
  }, [checkConnection]);

  return {
    ...state,
    connect,
    disconnect,
    signTransaction: signTx,
    refresh: checkConnection,
  };
}
