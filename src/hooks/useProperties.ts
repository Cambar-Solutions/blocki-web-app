import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesAPI } from '../services/api';
import toast from 'react-hot-toast';
import type { CreatePropertyDto, TokenizePropertyDto } from '../types/property';

export function useProperties(params?: {
  limit?: number;
  offset?: number;
  status?: string;
  type?: string;
}) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: async () => {
      const response = await propertiesAPI.getAll(params);
      return response.data;
    },
  });
}

export function useProperty(id?: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      const response = await propertiesAPI.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function usePropertyOwnership(id?: string) {
  return useQuery({
    queryKey: ['property-ownership', id],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      const response = await propertiesAPI.getOwnership(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function usePropertyHistory(id?: string, limit?: number) {
  return useQuery({
    queryKey: ['property-history', id, limit],
    queryFn: async () => {
      if (!id) throw new Error('Property ID is required');
      const response = await propertiesAPI.getHistory(id, { limit });
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePropertyDto) => {
      const response = await propertiesAPI.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property created successfully!');
    },
    onError: (error) => {
      toast.error(
        `Failed to create property: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreatePropertyDto>;
    }) => {
      const response = await propertiesAPI.update(id, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['property', data.id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property updated successfully!');
    },
    onError: (error) => {
      toast.error(
        `Failed to update property: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

export function useTokenizeProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyId,
      data,
    }: {
      propertyId: string;
      data?: TokenizePropertyDto;
    }) => {
      const response = await propertiesAPI.tokenize(propertyId, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['property', data.property.id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success(
        `Property tokenized successfully! Contract ID: ${data.tokenContractId.slice(0, 8)}...`
      );
    },
    onError: (error) => {
      toast.error(
        `Tokenization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}

export function useUploadPropertyImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ propertyId, files }: { propertyId: string; files: File[] }) => {
      const response = await propertiesAPI.uploadImages(propertyId, files);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['property', variables.propertyId] });
      toast.success('Images uploaded successfully!');
    },
    onError: (error) => {
      toast.error(
        `Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });
}
