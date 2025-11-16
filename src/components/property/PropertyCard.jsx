import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { MapPin, TrendingUp, Home, Maximize2 } from 'lucide-react'

export function PropertyCard({ property }) {
  const navigate = useNavigate()

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getTypeLabel = (type) => {
    const types = {
      RESIDENTIAL: 'Residencial',
      COMMERCIAL: 'Comercial',
      LAND: 'Terreno',
      INDUSTRIAL: 'Industrial',
    }
    return types[type] || type
  }

  return (
    <Card
      hover
      className="cursor-pointer overflow-hidden group animate-fadeIn"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 transform transition-all duration-300 group-hover:scale-105">
          <Badge variant="default" className="backdrop-blur-md bg-white/95 dark:bg-gray-800/95 shadow-lg">
            {getTypeLabel(property.type)}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 transform transition-all duration-300 group-hover:scale-105">
          <Badge variant="success" className="backdrop-blur-md shadow-lg">
            {property.tokenizedPercentage}% Tokenizado
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-bold text-xl">{formatCurrency(property.valuation)}</p>
          <p className="text-white/90 text-sm">{formatCurrency(property.tokenPrice)}/token</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{property.city}, {property.country}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {property.area > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.area}m²</p>
            </div>
          )}
          {property.bedrooms > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                <Home className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{property.bedrooms} habs</p>
            </div>
          )}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">{property.roi}% ROI</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>{property.availableTokens} tokens disponibles</span>
            <span>{property.totalTokens} total</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${property.tokenizedPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  )
}
