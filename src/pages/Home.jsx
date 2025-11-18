import { useState } from 'react'
import { Layout } from '../components/layout/Layout'
import { PropertyCard } from '../components/property/PropertyCard'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { HowItWorksModal } from '../components/HowItWorks'
import { mockProperties, filterProperties } from '../data/mockProperties'
import { Search, Filter, TrendingUp, Shield, Zap, X } from 'lucide-react'

export function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const filters = {
    search: searchTerm,
    type: selectedType,
    city: selectedCity,
  }

  const filteredProperties = filterProperties(filters)

  const cities = ['Buenos Aires', 'São Paulo', 'Río de Janeiro', 'Santiago', 'Medellín', 'Lima']
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
    <>
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
      <Layout>
      {/* Hero Section - Enhanced */}
      <div className="hero-section relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden min-h-[600px] flex items-center">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* 3D Building Illustration SVG */}
        <svg className="absolute bottom-0 right-0 w-1/3 h-auto opacity-10" viewBox="0 0 200 300" fill="none">
          <rect x="40" y="80" width="50" height="200" fill="url(#building1)" opacity="0.6"/>
          <rect x="100" y="50" width="60" height="230" fill="url(#building2)" opacity="0.7"/>
          <rect x="10" y="120" width="40" height="160" fill="url(#building3)" opacity="0.5"/>
          <defs>
            <linearGradient id="building1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="building2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="building3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-fadeIn">
                <Shield className="w-4 h-4 text-green-300" />
                <span className="text-sm text-white/90 font-medium">Verificado en Stellar Blockchain</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slideUp leading-tight">
                Democratizamos
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                  el Real Estate
                </span>
                <br />
                en Latinoamérica
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl animate-fadeIn leading-relaxed">
                Invierte desde <span className="text-green-300 font-bold">$100 USD</span> en propiedades tokenizadas.
                Sin intermediarios, con seguridad blockchain y retornos verificables.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 animate-fadeIn">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  onClick={() => document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <TrendingUp className="w-5 h-5" />
                  Explorar Propiedades
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => setShowHowItWorks(true)}
                >
                  <Shield className="w-5 h-5" />
                  Cómo Funciona
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 animate-fadeIn">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{mockProperties.length}</p>
                  <p className="text-white/60 text-sm">Propiedades</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-300 mb-1">8.5%</p>
                  <p className="text-white/60 text-sm">ROI Promedio</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-300 mb-1">100%</p>
                  <p className="text-white/60 text-sm">Verificadas</p>
                </div>
              </div>
            </div>

            {/* Right - Feature Cards */}
            <div className="hidden lg:grid grid-cols-1 gap-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">KYC Verificado</h3>
                <p className="text-white/70 text-sm">Cumplimiento legal con verificación de identidad en toda LATAM</p>
              </div>

              <div className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Stellar Blockchain</h3>
                <p className="text-white/70 text-sm">Transacciones rápidas, seguras y con fees mínimos</p>
              </div>

              <div className="glass backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inversión Accesible</h3>
                <p className="text-white/70 text-sm">Accede al mercado inmobiliario desde fracciones pequeñas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="search-section bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30 shadow-sm">
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
      <div id="properties-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} className={index === 0 ? 'property-card' : ''} />
            ))}
          </div>
        )}
      </div>
    </Layout>
    </>
  )
}
