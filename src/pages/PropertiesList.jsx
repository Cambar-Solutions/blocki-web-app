import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { useWallet } from '../hooks/useWallet';
import PropertyCard from '../components/properties/PropertyCard';
import { Button } from '../components/Button';
import { Spinner } from '../components/ui/spinner';
import { Plus, AlertCircle } from 'lucide-react';

/**
 * Properties list page
 * Browse all properties with filtering by status
 */
export default function PropertiesList() {
  const [filter, setFilter] = useState(undefined);
  const { data: properties, isLoading, error } = useProperties({ status: filter });
  const { isConnected } = useWallet();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-lg text-muted-foreground">
          Error loading properties: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Properties
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Browse and invest in tokenized real estate properties
            </p>
          </div>

          {isConnected && (
            <Link to="/properties/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Property
              </Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={!filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(undefined)}
          >
            All
          </Button>
          <Button
            variant={filter === 'tokenized' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('tokenized')}
          >
            Tokenized
          </Button>
          <Button
            variant={filter === 'verified' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('verified')}
          >
            Verified
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
        </div>

        {/* Properties Grid */}
        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No properties found</p>
            {isConnected && (
              <Link to="/properties/create" className="mt-4 inline-block">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Property
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
