import { useWallet } from '../hooks/useWallet';
import { usePortfolio, useMyProperties, useMyTransactions } from '../hooks/useUser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Spinner } from '../components/ui/spinner';
import WalletConnect from '../components/wallet/WalletConnect';
import WalletStatus from '../components/wallet/WalletStatus';
import { Building2, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

/**
 * Dashboard page - Main user dashboard with portfolio overview
 * Shows wallet status, owned properties, investments, and recent transactions
 */
export default function DashboardPage() {
  const { isConnected, publicKey } = useWallet();
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { data: myProperties, isLoading: propertiesLoading } = useMyProperties({ limit: 5 });
  const { data: transactions, isLoading: transactionsLoading } = useMyTransactions({ limit: 10 });

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Building2 className="w-16 h-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Please connect your Stellar wallet to access your dashboard and manage your
            property investments
          </p>
          <WalletConnect />
        </div>
      </div>
    );
  }

  if (portfolioLoading || propertiesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here's an overview of your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Summary Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${portfolio?.totalValue.toLocaleString() || '0'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {portfolio?.totalProperties || 0} properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolio?.ownedProperties.length || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Tokenized properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolio?.investments.length || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Active investments
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Wallet & Properties */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Properties */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Properties</CardTitle>
                  <Link to="/properties">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
                <CardDescription>Properties you own and manage</CardDescription>
              </CardHeader>
              <CardContent>
                {myProperties && myProperties.length > 0 ? (
                  <div className="space-y-4">
                    {myProperties.map((property) => (
                      <Link
                        key={property.id}
                        to={`/properties/${property.id}`}
                        className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{property.address}</h4>
                            <p className="text-sm text-muted-foreground">
                              {property.metadata.location.city}, {property.metadata.location.state}
                            </p>
                          </div>
                          <Badge
                            variant={property.status === 'tokenized' ? 'success' : 'outline'}
                          >
                            {property.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="font-medium">
                            ${property.valuation.toLocaleString()}
                          </span>
                          {property.tokenContractId && (
                            <span className="text-muted-foreground">
                              {property.totalSupply?.toLocaleString()} tokens
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You don't have any properties yet
                    </p>
                    <Link to="/properties/create">
                      <Button size="sm">Create Property</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your latest activity</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions && transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium capitalize">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {tx.tokensAmount.toLocaleString()} tokens
                          </p>
                          {tx.price && (
                            <p className="text-xs text-muted-foreground">
                              ${tx.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No transactions yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Wallet Status & Investments */}
          <div className="space-y-6">
            <WalletStatus />

            {/* My Investments */}
            {portfolio && portfolio.investments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>My Investments</CardTitle>
                  <CardDescription>Your fractional ownership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.investments.map((investment) => (
                    <Link
                      key={investment.propertyId}
                      to={`/properties/${investment.propertyId}`}
                      className="block p-3 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-semibold text-sm line-clamp-1">
                            {investment.propertyAddress}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {investment.property.location.city}
                          </p>
                        </div>
                        <Badge variant={investment.profit >= 0 ? 'success' : 'destructive'}>
                          {investment.profitPercentage >= 0 ? '+' : ''}
                          {investment.profitPercentage.toFixed(2)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Ownership</p>
                          <p className="font-medium">{investment.percentage.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Value</p>
                          <p className="font-medium">${investment.currentValue.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
