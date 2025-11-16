import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketplaceAPI } from '../services/api';
import toast from 'react-hot-toast';
import type { CreateListingDto, BuyTokensDto } from '../types/marketplace';

export function useListings(params?: {
  status?: string;
  limit?: number;
  offset?: number;
  propertyId?: string;
}) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: async () => {
      const response = await marketplaceAPI.getListings(params);
      return response.data;
    },
  });
}

export function useListing(id?: string) {
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

export function useRecentTransactions(limit?: number) {
  return useQuery({
    queryKey: ['recent-transactions', limit],
    queryFn: async () => {
      const response = await marketplaceAPI.getRecentTransactions({ limit });
      return response.data;
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateListingDto) => {
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

export function useCancelListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listingId: string) => {
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

export function useBuyTokens() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BuyTokensDto) => {
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
