import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../Button';
import { MapPin, Home, DollarSign } from 'lucide-react';

/**
 * @typedef {Object} Property
 * @property {string} id
 * @property {string} address
 * @property {string} status
 * @property {number} valuation
 * @property {string} [tokenContractId]
 * @property {number} [totalSupply]
 * @property {Object} metadata
 * @property {string[]} metadata.images
 * @property {string} metadata.type
 * @property {number} metadata.area
 * @property {Object} metadata.location
 * @property {string} metadata.location.city
 * @property {string} metadata.location.state
 */

/**
 * @typedef {Object} PropertyCardProps
 * @property {Property} property
 */

/**
 * Property card component for displaying property overview
 * @param {PropertyCardProps} props
 */
export default function PropertyCard({ property }) {
  const getStatusBadge = () => {
    /** @type {Record<string, 'success' | 'warning' | 'info' | 'outline'>} */
    const variants = {
      tokenized: 'success',
      verified: 'info',
      pending: 'warning',
      active: 'success',
    };

    return (
      <Badge variant={variants[property.status] || 'outline'}>
        {property.status.toUpperCase()}
      </Badge>
    );
  };

  const primaryImage = property.metadata.images[0] || '/placeholder-property.jpg';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={primaryImage}
          alt={property.address}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-1">{property.address}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {property.metadata.location.city}, {property.metadata.location.state}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Home className="w-4 h-4" />
            {property.metadata.type}
          </span>
          <span className="font-medium">{property.metadata.area} m²</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-xl font-bold">
            ${property.valuation.toLocaleString()}
          </span>
        </div>

        {property.tokenContractId && property.totalSupply && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">Total Supply</p>
            <p className="text-sm font-semibold">{property.totalSupply.toLocaleString()} tokens</p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link to={`/properties/${property.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
