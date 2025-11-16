import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../services/api';
import { useWallet } from './useWallet';
import toast from 'react-hot-toast';

export function useAuth() {
  const { publicKey, signTransaction } = useWallet();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', publicKey],
    queryFn: async () => {
      const response = await authAPI.getProfile();
      return response.data;
    },
    enabled: !!publicKey && !!localStorage.getItem('session_token'),
    retry: 1,
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!publicKey) {
        throw new Error('Wallet not connected');
      }

      // Step 1: Get challenge from backend
      const challengeResponse = await authAPI.getChallenge();
      const { challenge } = challengeResponse.data;

      // Step 2: Sign challenge with wallet
      // For Stellar auth, we need to sign the challenge message
      // This is a simplified version - you may need to create a proper transaction
      const signature = await signTransaction(challenge);

      // Step 3: Verify signature with backend
      const verifyResponse = await authAPI.verify(publicKey, signature, challenge);
      const { token, user } = verifyResponse.data;

      // Store token
      localStorage.setItem('session_token', token);

      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['user', publicKey], user);
      toast.success('Successfully logged in');
    },
    onError: (error) => {
      toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authAPI.logout();
    },
    onSuccess: () => {
      localStorage.removeItem('session_token');
      queryClient.clear();
      toast.success('Successfully logged out');
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !!localStorage.getItem('session_token'),
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };
}
