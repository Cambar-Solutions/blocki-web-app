import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  getAccount,
  getAccountBalance,
  createPaymentTransaction,
  submitTransaction,
  fundTestnetAccount,
} from '../services/stellar';

/**
 * Hook to fetch account details
 */
export function useAccount(publicKey) {
  return useQuery({
    queryKey: ['account', publicKey],
    queryFn: () => getAccount(publicKey),
    enabled: !!publicKey,
    onError: (error) => {
      toast.error(`Error loading account: ${error.message}`);
    },
  });
}

/**
 * Hook to fetch account balance
 */
export function useAccountBalance(publicKey) {
  return useQuery({
    queryKey: ['balance', publicKey],
    queryFn: () => getAccountBalance(publicKey),
    enabled: !!publicKey,
    refetchInterval: 10000, // Refetch every 10 seconds
    onError: (error) => {
      toast.error(`Error loading balance: ${error.message}`);
    },
  });
}

/**
 * Hook to create and submit a payment
 */
export function usePayment() {
  return useMutation({
    mutationFn: async ({ sourcePublicKey, destinationPublicKey, amount, signer }) => {
      // Create transaction
      const transaction = await createPaymentTransaction(
        sourcePublicKey,
        destinationPublicKey,
        amount
      );

      // Sign transaction
      transaction.sign(signer);

      // Submit transaction
      const result = await submitTransaction(transaction);
      return result;
    },
    onSuccess: (data) => {
      toast.success('Payment submitted successfully!');
      return data;
    },
    onError: (error) => {
      toast.error(`Payment failed: ${error.message}`);
    },
  });
}

/**
 * Hook to fund a testnet account
 */
export function useFundTestnetAccount() {
  return useMutation({
    mutationFn: (publicKey) => fundTestnetAccount(publicKey),
    onSuccess: () => {
      toast.success('Testnet account funded successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to fund account: ${error.message}`);
    },
  });
}
