import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} ListingsParams
 * @property {string} [status]
 * @property {number} [limit]
 * @property {number} [offset]
 * @property {string} [propertyId]
 */

/**
 * @typedef {Object} CreateListingDto
 * @property {string} propertyId
 * @property {number} amount
 * @property {number} pricePerToken
 * @property {string} currency
 */

/**
 * @typedef {Object} BuyTokensDto
 * @property {string} listingId
 * @property {number} amount
 * @property {string} paymentMethod
 */

/**
 * Fetch marketplace listings with optional filters
 * @param {ListingsParams} [params]
 */
export function useListings(params) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: async () => {
      const response = await marketplaceAPI.getListings(params);
      return response.data;
    },
  });
}

/**
 * Fetch a single listing by ID
 * @param {string} [id]
 */
export function useListing(id) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      if (!id) throw new Error('Listing ID is required');
      const response = await marketplaceAPI.getListing(id);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Fetch marketplace statistics
 */
export function useMarketStats() {
  return useQuery({
    queryKey: ['market-stats'],
    queryFn: async () => {
      const response = await marketplaceAPI.getStats();
      return response.data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

/**
 * Fetch recent transactions
 * @param {number} [limit]
 */
export function useRecentTransactions(limit) {
  return useQuery({
    queryKey: ['recent-transactions', limit],
    queryFn: async () => {
      const response = await marketplaceAPI.getRecentTransactions({ limit });
      return response.data;
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}

/**
 * Create a new listing mutation
 */
export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {CreateListingDto} */ data) => {
      const response = await marketplaceAPI.createListing(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['property', data.listing.propertyId] });
      toast.success(
        `Listing created successfully! Tx: ${data.txHash.slice(0, 8)}...`
      );
    },
    onError: (error) => {
      toast.error(
        `Failed to create listing: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

/**
 * Cancel a listing mutation
 */
export function useCancelListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {string} */ listingId) => {
      const response = await marketplaceAPI.cancelListing(listingId);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success(
        `Listing cancelled successfully! Tx: ${data.txHash.slice(0, 8)}...`
      );
    },
    onError: (error) => {
      toast.error(
        `Failed to cancel listing: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

/**
 * Buy tokens mutation
 */
export function useBuyTokens() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {BuyTokensDto} */ data) => {
      const response = await marketplaceAPI.buy(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['market-stats'] });

      const message = data.escrowId
        ? `Tokens purchased! Escrow ID: ${data.escrowId.slice(0, 8)}...`
        : `Tokens purchased! Tx: ${data.txHash.slice(0, 8)}...`;

      toast.success(message);
    },
    onError: (error) => {
      toast.error(
        `Purchase failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}
