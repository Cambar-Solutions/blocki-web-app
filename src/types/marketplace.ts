export interface Listing {
  id: string;
  propertyId: string;
  seller: string;
  tokensAmount: number;
  pricePerToken: number;
  totalPrice: number;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  property?: {
    id: string;
    address: string;
    metadata: {
      images: string[];
      type: string;
      location: {
        city: string;
        state: string;
      };
    };
  };
}

export interface CreateListingDto {
  propertyId: string;
  tokensAmount: number;
  pricePerToken: number;
  expiresAt?: string;
}

export interface BuyTokensDto {
  listingId: string;
  tokensAmount: number;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  currency: 'MXN' | 'USD' | 'USDC';
  amount: number;
  provider?: 'moneygram' | 'stripe' | 'wallet';
}

export interface MarketStats {
  totalProperties: number;
  activeListings: number;
  totalVolume: number;
  totalTransactions: number;
  averagePrice: number;
  last24hVolume: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'tokenize' | 'transfer';
  propertyId: string;
  from: string;
  to: string;
  tokensAmount: number;
  price?: number;
  txHash: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
