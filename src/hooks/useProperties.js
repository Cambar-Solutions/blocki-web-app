import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * @typedef {Object} PropertiesParams
 * @property {number} [limit]
 * @property {number} [offset]
 * @property {string} [status]
 * @property {string} [type]
 */

/**
 * @typedef {Object} CreatePropertyDto
 * @property {string} title
 * @property {string} description
 * @property {string} address
 * @property {string} city
 * @property {string} country
 * @property {number} price
 * @property {string} currency
 * @property {string} propertyType
 * @property {number} area
 * @property {number} [bedrooms]
 * @property {number} [bathrooms]
 */

/**
 * @typedef {Object} TokenizePropertyDto
 * @property {number} [totalTokens]
 * @property {number} [pricePerToken]
 */

/**
 * Fetch properties with optional filters
 * @param {PropertiesParams} [params]
 */
export function useProperties(params) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: async () => {
      const response = await propertiesAPI.getAll(params);
      return response.data;
    },
  });
}

/**
 * Fetch a single property by ID
 * @param {string} [id]
 */
export function useProperty(id) {
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

/**
 * Fetch property ownership distribution
 * @param {string} [id]
 */
export function usePropertyOwnership(id) {
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

/**
 * Fetch property transaction history
 * @param {string} [id]
 * @param {number} [limit]
 */
export function usePropertyHistory(id, limit) {
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

/**
 * Create a new property mutation
 */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {CreatePropertyDto} */ data) => {
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

/**
 * Update a property mutation
 */
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {{ id: string, data: Partial<CreatePropertyDto> }} */ { id, data }) => {
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

/**
 * Tokenize a property mutation
 */
export function useTokenizeProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {{ propertyId: string, data?: TokenizePropertyDto }} */ { propertyId, data }) => {
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

/**
 * Upload property images mutation
 */
export function useUploadPropertyImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {{ propertyId: string, files: File[] }} */ { propertyId, files }) => {
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
