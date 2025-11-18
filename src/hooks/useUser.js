import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI, uploadKYCDocuments } from '../services/api';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} UpdateUserDto
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} [country]
 */

/**
 * @typedef {Object} KYCDocuments
 * @property {File} idDocument
 * @property {File} [proofOfAddress]
 * @property {File} [selfie]
 */

/**
 * @typedef {Object} TransactionsParams
 * @property {number} [limit]
 * @property {number} [offset]
 */

/**
 * Fetch current user profile
 */
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

/**
 * Update user profile mutation
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {UpdateUserDto} */ data) => {
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

/**
 * Fetch KYC verification status
 */
export function useKYCStatus() {
  return useQuery({
    queryKey: ['kyc-status'],
    queryFn: async () => {
      const response = await usersAPI.getKYCStatus();
      return response.data;
    },
  });
}

/**
 * Initiate KYC verification mutation
 */
export function useInitiateKYC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {KYCDocuments} */ documents) => {
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

/**
 * Fetch user's investment portfolio
 */
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

/**
 * Fetch user's owned properties
 * @param {number} [limit]
 */
export function useMyProperties(limit) {
  return useQuery({
    queryKey: ['my-properties', limit],
    queryFn: async () => {
      const response = await usersAPI.getMyProperties({ limit });
      return response.data;
    },
  });
}

/**
 * Fetch user's transaction history
 * @param {TransactionsParams} [params]
 */
export function useMyTransactions(params) {
  return useQuery({
    queryKey: ['my-transactions', params],
    queryFn: async () => {
      const response = await usersAPI.getMyTransactions(params);
      return response.data;
    },
  });
}
