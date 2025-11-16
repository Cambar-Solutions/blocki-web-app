import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../lib/constants';
import type {
  Property,
  CreatePropertyDto,
  TokenizePropertyDto,
  PropertyOwnership,
} from '../types/property';
import type {
  Listing,
  CreateListingDto,
  BuyTokensDto,
  MarketStats,
  Transaction,
} from '../types/marketplace';
import type {
  User,
  UpdateUserDto,
  KYCDocuments,
  KYCStatus,
  Portfolio,
} from '../types/user';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('session_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('session_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  getChallenge: () =>
    api.post<{ challenge: string }>('/auth/challenge'),

  verify: (publicKey: string, signature: string, challenge: string) =>
    api.post<{ token: string; user: User }>('/auth/verify', {
      publicKey,
      signature,
      challenge
    }),

  logout: () =>
    api.post('/auth/logout'),

  getProfile: () =>
    api.get<User>('/auth/profile'),
};

// Properties endpoints
export const propertiesAPI = {
  getAll: (params?: {
    limit?: number;
    offset?: number;
    status?: string;
    type?: string;
  }) =>
    api.get<Property[]>('/properties', { params }),

  getById: (id: string) =>
    api.get<Property>(`/properties/${id}`),

  create: (data: CreatePropertyDto) =>
    api.post<Property>('/properties', data),

  update: (id: string, data: Partial<CreatePropertyDto>) =>
    api.patch<Property>(`/properties/${id}`, data),

  tokenize: (id: string, data?: TokenizePropertyDto) =>
    api.post<{
      tokenContractId: string;
      txHash: string;
      property: Property;
    }>(`/properties/${id}/tokenize`, data),

  getOwnership: (id: string) =>
    api.get<PropertyOwnership[]>(`/properties/${id}/ownership`),

  getHistory: (id: string, params?: { limit?: number }) =>
    api.get<Transaction[]>(`/properties/${id}/history`, { params }),

  uploadImages: (id: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    return api.post<{ urls: string[] }>(`/properties/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Marketplace endpoints
export const marketplaceAPI = {
  getListings: (params?: {
    status?: string;
    limit?: number;
    offset?: number;
    propertyId?: string;
  }) =>
    api.get<Listing[]>('/marketplace/listings', { params }),

  getListing: (id: string) =>
    api.get<Listing>(`/marketplace/listings/${id}`),

  createListing: (data: CreateListingDto) =>
    api.post<{ listing: Listing; txHash: string }>('/marketplace/listings', data),

  cancelListing: (id: string) =>
    api.delete<{ txHash: string }>(`/marketplace/listings/${id}`),

  buy: (data: BuyTokensDto) =>
    api.post<{
      transaction: Transaction;
      txHash: string;
      escrowId?: string;
    }>('/marketplace/buy', data),

  getStats: () =>
    api.get<MarketStats>('/marketplace/stats'),

  getRecentTransactions: (params?: { limit?: number }) =>
    api.get<Transaction[]>('/marketplace/transactions', { params }),
};

// Users endpoints
export const usersAPI = {
  getMe: () =>
    api.get<User>('/users/me'),

  updateMe: (data: UpdateUserDto) =>
    api.patch<User>('/users/me', data),

  initiateKYC: (data: FormData) =>
    api.post<{ kycId: string; status: string }>('/users/kyc/initiate', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  getKYCStatus: () =>
    api.get<KYCStatus>('/users/kyc/status'),

  getPortfolio: () =>
    api.get<Portfolio>('/users/portfolio'),

  getMyProperties: (params?: { limit?: number }) =>
    api.get<Property[]>('/users/properties', { params }),

  getMyTransactions: (params?: { limit?: number; offset?: number }) =>
    api.get<Transaction[]>('/users/transactions', { params }),
};

// Health check
export const healthAPI = {
  check: () =>
    api.get<{ status: string; timestamp: string }>('/health'),
};

// Helper function to handle file uploads for KYC
export async function uploadKYCDocuments(documents: KYCDocuments) {
  const formData = new FormData();
  formData.append('ineFront', documents.ineFront);
  formData.append('ineBack', documents.ineBack);
  formData.append('selfie', documents.selfie);
  if (documents.propertyId) {
    formData.append('propertyId', documents.propertyId);
  }
  return usersAPI.initiateKYC(formData);
}

export default api;
