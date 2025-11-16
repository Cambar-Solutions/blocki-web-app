import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { PropertyCard } from '../components/property/PropertyCard'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { mockProperties, filterProperties } from '../data/mockProperties'
import { Search, Filter, TrendingUp, Shield, Zap, X } from 'lucide-react'

export function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filters = {
    search: searchTerm,
    type: selectedType,
    city: selectedCity,
  }

  const filteredProperties = filterProperties(filters)

  const cities = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Querétaro', 'Acapulco']
  const types = [
    { value: 'RESIDENTIAL', label: 'Residencial' },
    { value: 'COMMERCIAL', label: 'Comercial' },
    { value: 'LAND', label: 'Terreno' },
  ]

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setSelectedCity('')
  }

  const hasActiveFilters = searchTerm || selectedType || selectedCity

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMC00YzUuNTIzIDAgMTAgNC40NzcgMTAgMTBzLTQuNDc3IDEwLTEwIDEwLTEwLTQuNDc3LTEwLTEwIDQuNDc3LTEwIDEwLTEweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slideUp">
              Invierte en el Futuro
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                del Real Estate
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeIn">
              Compra fracciones de propiedades verificadas en LATAM con blockchain
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="glass backdrop-blur-xl rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-300" />
                  <p className="text-3xl font-bold text-white">{mockProperties.length}</p>
                </div>
                <p className="text-white/80 text-sm">Propiedades Activas</p>
              </div>
              <div className="glass backdrop-blur-xl rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-300" />
                  <p className="text-3xl font-bold text-white">100%</p>
                </div>
                <p className="text-white/80 text-sm">Verificadas</p>
              </div>
              <div className="glass backdrop-blur-xl rounded-2xl p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <p className="text-3xl font-bold text-white">8.5%</p>
                </div>
                <p className="text-white/80 text-sm">ROI Promedio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Buscar por ciudad, dirección o tipo..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              )}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="sm:w-auto">
                <X className="w-4 h-4" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ciudad
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas las ciudades</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Propiedad
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los tipos</option>
                    {types.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Propiedades Disponibles
            <span className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredProperties.length} resultados)
            </span>
          </h2>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <Button onClick={clearFilters}>Limpiar filtros</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
