import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI, uploadKYCDocuments } from '../services/api';
import toast from 'react-hot-toast';
import type { UpdateUserDto, KYCDocuments } from '../types/user';

export function useUser() {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await usersAPI.getMe();
      return response.data;
    },
    retry: 1,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const response = await usersAPI.updateMe(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(
        `Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

export function useKYCStatus() {
  return useQuery({
    queryKey: ['kyc-status'],
    queryFn: async () => {
      const response = await usersAPI.getKYCStatus();
      return response.data;
    },
  });
}

export function useInitiateKYC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documents: KYCDocuments) => {
      const response = await uploadKYCDocuments(documents);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kyc-status'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast.success('KYC documents submitted successfully!');
    },
    onError: (error) => {
      toast.error(
        `Failed to submit KYC: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const response = await usersAPI.getPortfolio();
      return response.data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useMyProperties(limit?: number) {
  return useQuery({
    queryKey: ['my-properties', limit],
    queryFn: async () => {
      const response = await usersAPI.getMyProperties({ limit });
      return response.data;
    },
  });
}

export function useMyTransactions(params?: { limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ['my-transactions', params],
    queryFn: async () => {
      const response = await usersAPI.getMyTransactions(params);
      return response.data;
    },
  });
}
