import { useState } from 'react';
import { useListings, useMarketStats } from '../hooks/useMarketplace';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/spinner';
import { TrendingUp, ShoppingCart, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

/**
 * Marketplace home page
 * Displays market statistics and property token listings for sale
 */
export default function MarketplaceHome() {
  const [statusFilter, setStatusFilter] = useState('active');
  const { data: listings, isLoading } = useListings({ status: statusFilter });
  const { data: stats } = useMarketStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Marketplace
        </h1>

        {/* Market Stats */}
        {stats && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Properties
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProperties}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Listings
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeListings}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Volume
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalVolume.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalTransactions}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === 'sold' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('sold')}
          >
            Sold
          </Button>
          <Button
            variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('cancelled')}
          >
            Cancelled
          </Button>
        </div>

        {/* Listings */}
        {listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {listing.property && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={listing.property.metadata.images[0] || '/placeholder-property.jpg'}
                      alt={listing.property.address}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-1">
                      {listing.property?.address || 'Property'}
                    </CardTitle>
                    <Badge variant={listing.status === 'active' ? 'success' : 'outline'}>
                      {listing.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {listing.property?.metadata.location.city}, {listing.property?.metadata.location.state}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tokens</p>
                      <p className="font-semibold">{listing.tokensAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price/Token</p>
                      <p className="font-semibold">${listing.pricePerToken}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Total Price</p>
                    <p className="text-xl font-bold text-green-600">
                      ${listing.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <Link to={`/marketplace/listings/${listing.id}`} className="block">
                    <Button className="w-full" disabled={listing.status !== 'active'}>
                      {listing.status === 'active' ? 'View & Buy' : 'View Details'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No {statusFilter} listings found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
