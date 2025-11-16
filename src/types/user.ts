export interface User {
  id: string;
  publicKey: string;
  email?: string;
  kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected';
  kycProvider?: string;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  country?: string;
  dateOfBirth?: string;
  nationality?: string;
}

export interface UpdateUserDto {
  email?: string;
  profile?: Partial<UserProfile>;
}

export interface KYCDocuments {
  ineFront: File;
  ineBack: File;
  selfie: File;
  propertyId?: string;
}

export interface KYCStatus {
  status: 'not_started' | 'pending' | 'approved' | 'rejected';
  provider: string;
  submittedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface Portfolio {
  totalValue: number;
  totalProperties: number;
  investments: PortfolioInvestment[];
  ownedProperties: PortfolioProperty[];
}

export interface PortfolioInvestment {
  propertyId: string;
  propertyAddress: string;
  tokensOwned: number;
  percentage: number;
  currentValue: number;
  purchaseValue: number;
  profit: number;
  profitPercentage: number;
  property: {
    images: string[];
    type: string;
    location: {
      city: string;
      state: string;
    };
  };
}

export interface PortfolioProperty {
  propertyId: string;
  address: string;
  valuation: number;
  tokensIssued: number;
  tokensAvailable: number;
  totalInvestors: number;
  status: string;
}
