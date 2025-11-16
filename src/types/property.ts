export interface Property {
  id: string;
  address: string;
  valuation: number;
  legalId: string;
  tokenContractId?: string;
  totalSupply?: number;
  status: 'pending' | 'verified' | 'tokenized' | 'active';
  createdAt: string;
  updatedAt: string;
  metadata: PropertyMetadata;
  owner: {
    publicKey: string;
    kycStatus?: string;
  };
}

export interface PropertyMetadata {
  description: string;
  images: string[];
  type: 'residential' | 'commercial' | 'land' | 'mixed';
  area: number; // square meters
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  location: PropertyLocation;
  amenities?: string[];
  documents?: PropertyDocument[];
}

export interface PropertyLocation {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  address: string;
}

export interface PropertyDocument {
  type: 'deed' | 'appraisal' | 'tax' | 'insurance' | 'other';
  url: string;
  name: string;
  uploadedAt: string;
}

export interface PropertyOwnership {
  propertyId: string;
  owner: string;
  balance: number;
  percentage: number;
  tokenContractId: string;
}

export interface CreatePropertyDto {
  address: string;
  valuation: number;
  legalId: string;
  metadata: PropertyMetadata;
}

export interface TokenizePropertyDto {
  propertyId: string;
  totalSupply?: number; // default 10000
}
